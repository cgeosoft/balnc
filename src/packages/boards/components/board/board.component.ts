import { Component, NgZone, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { BoardService } from '../../services/board.service'
import { BoardWithMessages } from '../../models/board'

@Component({
  selector: 'teams-boards-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChild('messageList') messageList: ElementRef
  @ViewChild('messageInput') messageInput: ElementRef

  selected: string
  boards: BoardWithMessages[]
  board: BoardWithMessages
  boardName: string

  inputMessage: string

  constructor (
    private boardService: BoardService,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit () {
    this.boardService.boards$.subscribe((boards) => {
      this.boards = boards
      this.loadBoard()
    })
    this.route.params.subscribe(params => {
      this.selected = params['board']
      this.loadBoard()
    })
  }

  async loadBoard () {
    if (!this.selected) { return }
    if (!this.boards || !this.boards.length) { return }
    this.board = this.boards.find(b => b.name === this.selected)
    this.boardName = this.board.name
    this.zone.run(() => {
      this.scrollToBottom()
      this.messageInput.nativeElement.focus()
    })
  }

  async send () {
    if (!this.inputMessage) { return }
    const msgText = this.inputMessage
    this.inputMessage = null
    await this.boardService.sendMessage({
      board: this.board.name,
      sender: this.boardService.nickname,
      text: msgText,
      type: 'MESSAGE'
    })

    this.zone.run(() => {
      this.scrollToBottom()
      this.messageInput.nativeElement.focus()
    })
  }

  scrollToBottom (): void {
    setTimeout(() => {
      this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight
    }, 100)
  }
}
