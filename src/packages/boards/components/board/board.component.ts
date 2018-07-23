import { Observable, Subscription } from 'rxjs'
import { Component, NgZone, OnInit, ElementRef, ViewChild, Pipe, PipeTransform } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Message } from '../../models/message'
import { BoardService } from '../../services/board.service'
import { Input } from '@angular/core';
import { BoardWithMessages } from '../../models/board';

@Component({
  selector: 'teams-boards-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChild('messageList') messageList: ElementRef
  @ViewChild('messageInput') messageInput: ElementRef

  board: BoardWithMessages
  
  inputMessage: string
  nickname: string

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.nickname = this.boardService.nickname
    this.route.params.subscribe(params => {
      this.board = this.boardService.getBoard(params['board'])
      this.boardService.loadMessages(params['board'])
    })
    this.messageInput.nativeElement.focus()
  }

  public async send() {

    if (!this.inputMessage) { return }

    const msgText = this.inputMessage
    this.inputMessage = null
    
    await this.boardService.sendMessage({
      board: this.board.name,
      sender: this.nickname,
      text: msgText,
      type: 'MESSAGE'
    })

    this.zone.run(() => {
      this.scrollToBottom()
      this.messageInput.nativeElement.focus()
    })
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
