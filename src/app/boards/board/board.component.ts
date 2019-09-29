import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subject } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { BoardsService } from '../_shared/boards.service'
import { Board } from '../_shared/models/board'
import { Message } from '../_shared/models/message'

@Component({
  selector: 'app-boards-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  host: { 'class': 'page' }
})
export class BoardComponent implements OnInit {

  @ViewChild('messageList', { static: false }) messageList: ElementRef
  @ViewChild('messageInput', { static: false }) messageInput: ElementRef

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

  constructor(
    public boardService: BoardsService,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.selected = params['id']
      if (!this.selected) return
      this.boardService.selectBoard(this.selected)
      this.board$ = this.boardService.getOne$<Board>('boards', this.selected)
      this.messages$ = this.boardService.getAll$<Message>('messages').pipe(
        map(messages => messages.filter(message => message.board === this.selected)),
        tap(messages => {
          messages.sort((a, b) => a.timestamp - b.timestamp)
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

  async send() {
    if (!this.inputMessage) { return }

    const dt = Date.now()
    const message: Message = {
      timestamp: dt,
      text: this.inputMessage,
      sender: this.boardService.nickname,
      board: this.selected,
      status: 'SEND',
      type: 'MESSAGE'
    }
    await this.boardService.addOne('messages', message)
    this.inputMessage = null
    this.scrollToBottom()
    this.focusInput()
  }

  async delete() {
    if (!confirm('Are you sure?')) return
    await this.boardService.deleteBoard(this.selected)
    this.router.navigate(['/boards'])
  }

  scrollToBottom(): void {
    if (this.messageList) {
      this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight
    }
  }

  focusInput(): void {
    if (this.messageInput) {
      this.messageInput.nativeElement.focus()
    }
  }
}
