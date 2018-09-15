import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { BoardService } from '../../board.service'
import { Observable } from 'rxjs'

import { Board } from '../../models/board'

@Component({
  selector: 'boards-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  boards$: Observable<Board[]>

  nickname: string
  newBoard: string
  unread: { [key: string]: number } = {}

  constructor (
    public boardService: BoardService,
    private router: Router
  ) { }

  ngOnInit () {
    this.nickname = this.boardService.nickname
    this.boards$ = this.boardService.boards$
  }

  async addBoard () {
    if (!this.newBoard) { return }
    await this.boardService.createBoard({
      name: this.newBoard
    })
    this.router.navigate(['/boards', this.newBoard])
    this.newBoard = null
  }

  changePersona () {
    this.boardService.nickname = this.nickname
  }
}
