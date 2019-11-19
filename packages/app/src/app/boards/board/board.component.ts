import { HttpClient, HttpParams } from '@angular/common/http'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subject } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Board } from '../_shared/models/board'
import { Message } from '../_shared/models/message'
import { BoardsRepo } from '../_shared/repos/boards.repo'
import { MessagesRepo } from '../_shared/repos/messages.repo'

interface OgResults {
  data: {
    ogLocale: string
    ogType: string
    ogTitle: string
    ogDescription: string
    ogUrl: string
    ogSiteName: string
    twitterCard: string
    twitterDescription: string
    twitterTitle: string
    twitterSite: string
    ogImage: {
      url: string
      width: number
      height: number
      type: any
    },
    twitterImage: {
      url: string

      width: null,
      height: null,
      alt: null
    }
  },
  success: boolean,
  requestUrl: string
}

const urlRegex = /(https?:\/\/[^\s]+)/g

@Component({
  selector: 'app-boards-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  host: { 'class': 'page' }
})
export class BoardComponent implements OnInit {

  @ViewChild('messageList', { static: false }) messageList: ElementRef
  @ViewChild('messageInput', { static: false }) messageInput: ElementRef
  @ViewChild('fileupload', { static: false }) fileupload: ElementRef

  selected: string
  board: Board
  boardName: string

  inputMessage: string

  messages$: Observable<Message[]>
  filteredMessages$: Subject<Message[]>

  menu = {
    selected: 'messages',
    items: [{
      id: 'messages',
      label: 'Messages',
      icon: ['fas', 'comments']
    }, {
      id: 'manage',
      label: 'Manage',
      icon: ['fas', 'cog']
    }]
  }
  board$: Observable<Board>
  previews: {
    [key: string]: {
      base64?: string,
      file?: any,
      blob?: Blob,
      og?: OgResults
    }
  } = {}

  constructor (
    private boardService: BoardsRepo,
    private messagesRepo: MessagesRepo,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit () {
    this.route.params.subscribe(async (params) => {
      this.selected = params['id']
      if (!this.selected) return
      this.boardService.selected = this.selected
      this.board$ = this.boardService.one$(this.selected)
      this.messages$ = this.messagesRepo.all$(this.selected).pipe(
        map(messages => messages.filter(message => message.board === this.selected)),
        tap(messages => {
          messages.sort((a, b) => a._timestamp - b._timestamp)
        }),
        tap(async (messages) => {
          const ps = messages
            .map(async (msg, i) => {
              if (!this.previews[msg._id]) {
                this.previews[msg._id] = {}
                if (msg.file) {
                  this.previews[msg._id].file = await this.messagesRepo.getAttachment(msg._id, msg.file)
                  if (this.previews[msg._id].file) {
                    this.previews[msg._id].blob = await this.previews[msg._id].file.getData()
                    if (this.previews[msg._id].file.type.startsWith('image/')) {
                      this.previews[msg._id].base64 = await this.getImage(this.previews[msg._id].blob, this.previews[msg._id].file.type)
                    }
                  }
                }
                if (msg.text) {
                  const urls = msg.text.match(urlRegex)
                  if (urls) {
                    msg.text = msg.text.replace(urlRegex, (url) => `<a target="_blank" href="${url}">${url}</a>`)
                    let params = new HttpParams().set('q', urls[0])
                    this.previews[msg._id].og = await this.http.get<OgResults>('http://localhost:3000/api/og', { params }).toPromise()
                  }
                }
              }
            })
          await Promise.all(ps)

        }),
        tap(() => {
          setTimeout(() => {
            this.scrollToBottom()
            this.focusInput()
          }, 100)
        })
      )
    })
  }

  // selectBoard(boardId) {
  //   let bs1 = this.boardsStats.find(x => x.id === boardId)
  //   if (!bs1) {
  //     bs1 = {
  //       id: boardId,
  //       lastread: 0,
  //       unread: 0
  //     }
  //     this.boardsStats.push(bs1)
  //   }
  //   bs1.unread = 0
  //   bs1.lastread = Date.now()
  //   this.selectedBoard = boardId
  // }

  async deleteBoard (id) {
    // let board = await this.db['boards'].findOne(id).exec()
    // board.remove()

    // let messages = await this.db['messages'].find().where('board').eq(id).exec()
    // messages.forEach(m => {
    //   m.remove()
    // })
  }

  async send () {
    if (!this.inputMessage) { return }
    const data = {
      text: this.inputMessage,
      sender: 'anonymous',
      board: this.selected,
      status: 'SEND',
      type: 'MESSAGE'
    }
    await this.messagesRepo.add(data, this.selected)
    this.inputMessage = null
  }

  async attach () {
    this.fileupload.nativeElement.click()
  }

  async upload (file: File) {
    const data: Partial<Message> = {
      text: null,
      sender: 'anonymous',
      board: this.selected,
      status: 'SEND',
      type: 'MESSAGE',
      file: file.name
    }
    const msg = await this.messagesRepo.add(data, this.selected)
    await this.messagesRepo.upload(msg._id, file)
  }

  async download (msg: Message) {
    const attachment = await this.messagesRepo.getAttachment(msg._id, msg.file)
    if (!attachment) return
    const blob = await attachment.getData()
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.href = window.URL.createObjectURL(blob)
    a.download = msg.file
    a.click()
    window.URL.revokeObjectURL(a.href)

    // window['saveAs'](blob, msg.file)
  }

  getImage (blob: Blob, type: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          const base64 = result.split(',')[1]
          const src = 'data:' + type + ';base64,' + base64
          resolve(src)
        }
        reader.readAsDataURL(blob)
      } catch (err) {
        reject()
      }
    })
  }

  async delete () {
    if (!confirm('Are you sure?')) return
    await this.boardService.remove(this.selected)
    await this.router.navigate(['/boards'])
  }

  scrollToBottom (): void {
    if (this.messageList) {
      this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight
    }
  }

  focusInput (): void {
    if (this.messageInput) {
      this.messageInput.nativeElement.focus()
    }
  }
}
