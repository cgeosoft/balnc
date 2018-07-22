import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { BoardService } from '../../services/board.service'
import { Subject,Subscription,Observable } from 'rxjs';

import { Message } from '../../models/message'
import { Board } from '../../models/board'

@Component({
  selector: 'teams-boards-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  boards$: Observable<Board[]>
  messages$: Observable<Message[]>
    
  nickname: string
  newBoard: string
  unread: { [key: string]: number } = {}

  constructor (
    private boardService: BoardService,
    private router: Router
  ) { }

  ngOnInit () {
    this.nickname = this.boardService.nickname
    this.boards$ = this.boardService.boards$
    this.messages$ = this.boardService.messages$
  }

  async addBoard () {
    if (!this.newBoard) { return }
    await this.boardService.createBoard({
      name: this.newBoard
    })
    this.router.navigate(['/boards', this.newBoard])
    this.newBoard = null
  }
}
