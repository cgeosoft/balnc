import { Observable ,  Subscription } from 'rxjs';
import { Component, NgZone, OnInit, ElementRef, ViewChild, Pipe, PipeTransform } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { RxCollection } from 'rxdb'


import * as _ from 'lodash'
import * as moment from 'moment'

import { ProfileService } from '@balnc/core/profile/services/profile.service';

import { Message } from '@balnc/teams/boards/models/message'
import { BoardService } from '@balnc/teams/boards/services/board.service';

@Component({
  selector: 'app-teams-boards-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChild('messageList') private messageList: ElementRef
  @ViewChild('messageInput') private messageInput: ElementRef

  board: string
  messages: Message[]
  sub: Subscription
  inputMessage: string
  nickname: string

  constructor(
    private boardService: BoardService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this.nickname = this.boardService.nickname
    this.route.params.subscribe(params => {
      this.load(params['board'])
    })
  }

  public async send() {

    if (!this.inputMessage) { return }

    await this.boardService.sendMessage({
      board: this.board,
      sender: this.nickname,
      text: this.inputMessage,
      type: "MESSAGE"
    })

    this.inputMessage = null
    this.zone.run(() => {
      this.scrollToBottom()
      this.messageInput.nativeElement.focus()
    })
  }

  private async load(board: string) {
    this.board = board
    await this.boardService.joinBoard(this.board)
    this.messages = this.boardService.messages[this.board]
    this.messageInput.nativeElement.focus()
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight
      }, 100)
    } catch (err) {
      console.error(err)
    }
  }
}
