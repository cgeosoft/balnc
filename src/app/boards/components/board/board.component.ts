import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subject } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { BoardsService } from '../../boards.service'
import { Board } from '../../models/board'
import { Message } from '../../models/message'

@Component({
  selector: 'boards-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChild('messageList') messageList: ElementRef
  @ViewChild('messageInput') messageInput: ElementRef

  selected: string
  boards: Board[]
  board: Board = {
    name: null
  }
  boardName: string

  inputMessage: string

  messages$: Observable<Message[]>
  filteredMessages$: Subject<Message[]>

  tabsMenu = {
    selected: 'messages',
    tabs: [{
      id: 'messages',
      label: 'Messages',
      icon: 'comments:regular'
    }, {
      id: 'files',
      label: 'Files',
      icon: 'copy'
    }, {
      id: 'manage',
      label: 'Manage',
      icon: 'cog',
      right: true
    }]
  }

  constructor (
    public boardService: BoardsService,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit () {
    this.boardService.boards$.subscribe((boards) => {
      this.boards = boards
    })

    this.route.params.subscribe(async (params) => {
      this.selected = params['id']
      this.board = await this.boardService.getOne('boards', this.selected)
      this.loadMessages()
    })
  }

  loadMessages () {
    this.messages$ = this.boardService
      .messages$
      .pipe(
        map(messages => messages.filter(message => message.board === this.selected))
      )

    this.messages$.subscribe(() => {
      this.zone.run(() => {
        this.scrollToBottom()
        this.focusInput()
      })
    })
  }

  async send () {
    if (!this.inputMessage) { return }

    const message: Message = {
      timestamp: new Date().getTime(),
      text: this.inputMessage,
      sender: this.boardService.nickname,
      board: this.selected,
      status: 'SEND',
      type: 'MESSAGE'
    }
    await this.boardService.sendMessage(message)
    this.inputMessage = null

    this.scrollToBottom()
    this.focusInput()
  }

  async delete () {
    await this.boardService.deleteBoard(this.board.name)
    this.router.navigate(['/boards'])
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
