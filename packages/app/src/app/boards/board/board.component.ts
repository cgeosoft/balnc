import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subject } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Board } from '../_shared/models/board'
import { Message } from '../_shared/models/message'
import { BoardsRepo } from '../_shared/repos/boards.repo'
import { MessagesRepo } from '../_shared/repos/messages.repo'

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

  constructor (
    public boardService: BoardsRepo,
    public messagesService: MessagesRepo,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit () {
    this.route.params.subscribe(async (params) => {
      this.selected = params['id']
      if (!this.selected) return
      this.boardService.selected = this.selected
      this.board$ = this.boardService.one$(this.selected)
      this.messages$ = this.messagesService.all$().pipe(
        tap(() => { console.log('test') }),
        map(messages => messages.filter(message => message.board === this.selected)),
        tap(messages => {
          messages.sort((a, b) => a._timestamp - b._timestamp)
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
    await this.messagesService.add(data)
    this.inputMessage = null
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
