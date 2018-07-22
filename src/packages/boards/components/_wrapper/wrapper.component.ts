import { Component, NgZone, OnInit, ElementRef, ViewChild, Pipe, PipeTransform } from '@angular/core'
import { Router } from '@angular/router';

import { BoardService } from '../../services/board.service';

@Component({
  selector: 'teams-boards-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  boards: any[]
  nickname: string
  newBoard: string
  unread: { [key: string]: number } = {}

  constructor(
    private boardService: BoardService,
    private router: Router
  ) { }

  ngOnInit() {
    this.nickname = this.boardService.nickname
    this.load()
  }

  async load() {
    this.boards = this.boardService.boards
  }

  async addBoard() {
    if (!this.newBoard) { return }
    await this.boardService.createBoard({
      name: this.newBoard,
    })
    this.router.navigate(["/boards", this.newBoard])
    this.newBoard = null
  }

}
