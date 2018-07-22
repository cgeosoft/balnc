import { Observable, Subscription } from 'rxjs'
import { Component, NgZone, OnInit, ElementRef, ViewChild, Pipe, PipeTransform } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Message } from '../../models/message'
import { BoardService } from '../../services/board.service'

@Component({
  selector: 'teams-boards-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChild('messageList') messageList: ElementRef
  @ViewChild('messageInput') messageInput: ElementRef

  messages$: Observable<Message[]>

  board: string
  messages: Message[]
  sub: Subscription
  inputMessage: string
  nickname: string

  constructor (
    private boardService: BoardService,
    private route: ActivatedRoute,
    private zone: NgZone
  ) { }

  ngOnInit () {
    this.nickname = this.boardService.nickname
    this.messages$ = this.boardService.messages$
    this.route.params.subscribe(params => {
      this.board = params['board']
    })
    this.messageInput.nativeElement.focus()
  }

  public async send () {

    if (!this.inputMessage) { return }

    await this.boardService.sendMessage({
      board: this.board,
      sender: this.nickname,
      text: this.inputMessage,
      type: 'MESSAGE'
    })

    this.inputMessage = null
    this.zone.run(() => {
      this.scrollToBottom()
      this.messageInput.nativeElement.focus()
    })
  }

  scrollToBottom (): void {
    try {
      setTimeout(() => {
        this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight
      }, 100)
    } catch (err) {
      console.error(err)
    }
  }
}

@Pipe({ name: 'filterBoard', pure: false })
export class FilterBoardPipe implements PipeTransform {
  transform (items: Message[], selectedBoard: string): Message[] {
    return items.filter(item => item.board === selectedBoard)
  }
}
