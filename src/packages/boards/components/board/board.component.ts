import { Component, NgZone, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { BoardsService } from '../../boards.service'
import { BoardWithMessages } from '../../models/board'

@Component({
  selector: 'boards-board',
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
    this.board = this.boards.find(b => b.name === this.selected) as BoardWithMessages

    if (!this.board) {
      this.router.navigate(['/boards'])
      return
    }

    this.boardName = this.board.name

    this.board.messages$.subscribe(() => {
      this.scrollToBottom()
    })

    setTimeout(() => {
      this.scrollToBottom()
      this.focusInput()
    }, 100)
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
