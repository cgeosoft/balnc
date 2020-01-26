import { HttpClient, HttpParams } from '@angular/common/http'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subject } from 'rxjs'
import { mergeMap, tap } from 'rxjs/operators'
import { RepositoryHelpers } from 'src/app/@core/services/repository.helpers'
import { Board } from '../@shared/models/board'
import { Message, OgMetadata } from '../@shared/models/message'
import { BoardsRepo } from '../@shared/repos/boards.repo'
import { MessagesRepo } from '../@shared/repos/messages.repo'

const urlRegex = /(https?:\/\/[^\s]+)/g

@Component({
  selector: 'app-boards-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']

})
export class BoardComponent implements OnInit {

  @ViewChild('messageList', { static: false }) messageList: ElementRef
  @ViewChild('messageInput', { static: false }) messageInput: ElementRef
  @ViewChild('fileupload', { static: false }) fileupload: ElementRef

  selected: string
  inputMessage: string

  messages$: Observable<Message[]>
  filteredMessages$: Subject<Message[]>

  board$: Observable<Board>
  previews: {
    [key: string]: {
      base64?: string,
      file?: any,
      blob?: Blob
    }
  } = {}

  constructor (
    private boardsRepo: BoardsRepo,
    private messagesRepo: MessagesRepo,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit () {
    this.route.params.subscribe(async (params) => {
      this.selected = params['id']
      if (!this.selected) return
      this.boardsRepo.selected = this.selected
      this.board$ = this.boardsRepo.one$(this.selected)
      this.messages$ = this.messagesRepo
        .all$({ group: this.selected })
        .pipe(
          mergeMap(async (data) => {
            const messages: Message[] = data.map(d => RepositoryHelpers.mapEntity(d))
            messages.sort((a, b) => a._date - b._date)
            const ps = messages.map(async (msg, i) => {
              if (!this.previews[msg._id]) {
                this.previews[msg._id] = {}
              }
              if (msg.file && !this.previews[msg._id].file) {
                this.previews[msg._id].file = await this.messagesRepo.getAttachment(msg._id, msg.file)
                if (this.previews[msg._id].file) {
                  this.previews[msg._id].blob = await this.previews[msg._id].file.getData()
                  if (this.previews[msg._id].file.type.startsWith('image/')) {
                    this.previews[msg._id].base64 = await this.getImage(this.previews[msg._id].blob, this.previews[msg._id].file.type)
                  }
                }
              }
              if (msg.text) {
                msg.text = msg.text.replace(urlRegex, (url) => `<a target="_blank" href="${url}">${url}</a>`)
              }
            })
            await Promise.all(ps)
            return messages
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
  // const bs1 = this.boardsStats.find(x => x.id === boardId)
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

  async pinBoard () {
    await this.boardsRepo.update(this.selected, {
      pinned: true
    })
  }

  async unpinBoard () {
    await this.boardsRepo.update(this.selected, {
      pinned: false
    })
  }

  async archiveBoard () {
    // todo
  }

  async unarchiveBoard () {
    // todo
  }

  async deleteBoard () {
    if (!confirm('Are you sure? All message will be deleted')) return
    await this.boardsRepo.remove(this.selected)

    const messages = await this.messagesRepo.all({ group: this.selected })
    const ps = messages.map(m => this.messagesRepo.remove(m._id))
    await Promise.all(ps)

    await this.router.navigateByUrl('/boards')
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

    const message = await this.messagesRepo.add(data, this.selected)

    this.inputMessage = null
    const urls = data.text.match(urlRegex)
    if (urls) {
      const params = new HttpParams().set('q', urls[0])
      const res = await this.http.get<{ data: OgMetadata }>('http://localhost:3000/api/og', { params }).toPromise()
      message.metadata = res.data
      await this.messagesRepo.update(message._id, {
        $set: { c: message }
      })
    }
  }

  async attach () {
    this.fileupload.nativeElement.click()
  }

  async upload (file: File) {
    const data: Partial<Message> = {
      text: null,
      sender: 'anonymous',
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
    await this.boardsRepo.remove(this.selected)
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
