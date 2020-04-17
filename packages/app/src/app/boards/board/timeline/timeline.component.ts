import { HttpClient, HttpParams } from '@angular/common/http'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap'
import { Observable, Subject, Subscription } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators'
import { Board } from '../../@shared/models/board'
import { BUser } from '../../@shared/models/buser'
import { Message, OgMetadata } from '../../@shared/models/message'
import { BoardsRepo } from '../../@shared/repos/boards.repo'
import { BUsersRepo } from '../../@shared/repos/buser.repo'
import { MessagesRepo } from '../../@shared/repos/messages.repo'
import { Emoji, EmojisService } from '../../@shared/services/emojis.service'
import { GiphyIntegrationConfig } from './../../../@shared/models/workspace'

const urlRegex = /(https?:\/\/[^\s]+)/g
const giphyApiUrl = 'https://api.giphy.com/v1/gifs'

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @ViewChild('messageList') messageList: ElementRef
  @ViewChild('messageInput') messageInput: ElementRef
  @ViewChild('fileupload') fileupload: ElementRef
  @ViewChild('giphyP') giphyP: NgbPopover
  @ViewChild('emojiP') emojiP: NgbPopover

  selected: string

  // messages$: Observable<Message[]>
  messages: Message[]
  filteredMessages$: Subject<Message[]>

  merged = {}

  board$: Observable<Board>
  previews: {
    [key: string]: {
      base64?: string,
      file?: any,
      blob?: Blob
    }
  } = {}
  sub: Subscription

  emojiGroupSelect = 0

  giphyResults: any[]
  messagesSubscriber$: Observable<any[]>
  quote: Message
  msgSeperatorDates = {}

  commands = ['topic']
  activeUsers$: Observable<BUser[]>

  get avatars () {
    return this.configService.users.reduce((l, i) => {
      l[i.username] = i.avatar
      return l
    }, {})
  }

  get nickname () {
    return this.configService.user.username
  }

  get emojis () {
    return this.emojisService.emojis
  }

  get giphy () {
    return this.configService.integrations?.giphy as GiphyIntegrationConfig
  }

  constructor (
    private configService: ConfigService,
    private boardsRepo: BoardsRepo,
    private messagesRepo: MessagesRepo,
    private busersRepo: BUsersRepo,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private emojisService: EmojisService
  ) { }

  async ngOnInit () {
    this.sub = this.route.parent.params.pipe(
      map(params => params['id']),
      switchMap(id => this.feedMessages(id))
    ).subscribe()

    this.enableGiphy()
  }

  enableGiphy () {
    if (this.giphy?.enabled && this.giphy?.apiKey) {
      this.giphySearch$
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((q: string) => {
            const url = `${giphyApiUrl}/search?api_key=${this.giphy.apiKey}&q=${q}&limit=10&offset=0&rating=R&lang=en`
            return this.http.get<{ data: any[] }>(url)
          })
        )
        .subscribe((res) => {
          this.giphyResults = res.data
        })
    }
  }

  feedMessages (id) {
    this.selected = id
    if (!this.selected) return
    this.boardsRepo.selected = this.selected
    this.board$ = this.boardsRepo.one$(this.selected)
    this.messages = null
    return this.messagesRepo.allm$({ group: this.selected }).pipe(
      map(async (messages) => {
        await this.busersRepo.join(this.selected)
        this.messages = messages
        this.messages.sort((a, b) => a._date - b._date)
        this.msgSeperatorDates = this.messages.reduce((l, i) => {
          let d = new Date(i._date)
          let df = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
          let msg = Object.keys(l).find(x => l[x] === df)
          if (!msg) l[i._id] = df
          return l
        }, {})
        this.merged = this.messages.reduce((l, i, x) => {
          if (this.messages[x - 1] &&
            this.messages[x - 1].type === 'MESSAGE' &&
            this.messages[x].type === 'MESSAGE' &&
            this.messages[x - 1].sender === this.messages[x].sender) {
            l[this.messages[x - 1]._id] = true
          }
          return l
        }, {})
        const ps = this.messages.map(async (msg, i) => {
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
        this.focusInput()
        this.scrollToBottom()
      }))
  }

  trackByMessages (index: number, el: Message) {
    return el._id
  }

  async ngOnDestroy () {
    // await this.buserRepo.leave(this.selected)
    this.sub.unsubscribe()
  }

  addEmoji (event, e: Emoji) {
    event.preventDefault()
    this.messageInput.nativeElement.value += `${e.char} `
    this.messageInput.nativeElement.focus()
    this.emojiP.close()
  }

  async send () {
    if (!this.messageInput.nativeElement.value) { return }

    if (await this.isCommand()) {
      return
    }

    const data: Partial<Message> = {
      text: this.messageInput.nativeElement.value,
      sender: this.nickname,
      status: 'SEND',
      type: 'MESSAGE'
    }

    if (this.quote) {
      data.quote = this.quote
    }

    this.messages.push({
      ...data, ...{
        _date: Date.now()
      }
    } as Message)
    this.scrollToBottom()

    const message = await this.messagesRepo.add(data, this.selected)

    this.messageInput.nativeElement.value = null
    this.quote = null
    const urls = data.text.match(urlRegex)
    if (urls && this.configService.integrations.server?.enabled) {
      const params = new HttpParams().set('q', urls[0])
      const res = await this.http
        .get<{ data: OgMetadata }>(`${this.configService.integrations.server['host']}/og`, { params })
        .toPromise()
      message.metadata = res.data
      await this.messagesRepo.update(message._id, message)
    }
  }

  async isCommand () {
    const text: string[] = this.messageInput.nativeElement.value.split(' ')
    const command: string = text[0].substr(1)
    if (this.commands.indexOf(command) === -1) return false

    this.messageInput.nativeElement.value = null
    switch (command) {
      case 'topic':
        const topic = text.slice(1).join(' ')
        await this.setTopic(topic)
        break
    }
    return true
  }

  async setTopic (topic: string) {
    await this.boardsRepo.update(this.selected, {
      topic
    })
    await this.messagesRepo.add({
      text: `Topic changed to "${topic}"`,
      sender: this.nickname,
      status: 'SEND',
      type: 'EVENT'
    }, this.selected)
  }

  async attach () {
    this.fileupload.nativeElement.click()
  }

  async upload (file: File) {
    const data: Partial<Message> = {
      text: null,
      sender: this.nickname,
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

  quoteMessage (m: Message) {
    this.quote = m
    this.messageInput.nativeElement.focus()
  }

  async delete () {
    if (!confirm('Are you sure?')) return
    await this.boardsRepo.remove(this.selected)
    await this.router.navigate(['/boards'])
  }

  async deleteMessage (m: Message) {
    if (!confirm('Are you sure?')) return
    await this.messagesRepo.remove(m._id)
  }

  async toggleMark (id: string) {
    await this.boardsRepo.mark(id)
  }

  scrollToBottom (): void {
    if (!this.messageList) return
    setTimeout(() => {
      this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight
    }, 100)
  }

  focusInput (): void {
    if (this.messageInput) {
      this.messageInput.nativeElement.focus()
    }
  }

  async giphyAdd (event, giphy) {
    event.preventDefault()
    const data: Partial<Message> = {
      sender: this.nickname,
      status: 'SEND',
      type: 'MESSAGE',
      image: {
        alt: giphy.title,
        url: giphy.images.original.url,
        width: giphy.images.original.width,
        height: giphy.images.original.height
      }
    }
    await this.messagesRepo.add(data, this.selected)
    this.messageInput.nativeElement.focus()
    this.giphyP.close()
    this.giphyResults = []
  }

  giphySearch$ = new Subject<string>()

  giphySearch (event) {
    this.giphySearch$.next(event.target.value)
  }
}
