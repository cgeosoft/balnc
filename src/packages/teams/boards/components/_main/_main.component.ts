import { Component, NgZone, OnInit, ElementRef, ViewChild, Pipe, PipeTransform } from '@angular/core'
import { Router } from '@angular/router';

import { BoardService } from '@balnc/teams/boards/services/board.service';

@Component({
  selector: 'app-teams-boards-main',
  templateUrl: './_main.component.html',
  styleUrls: ['./_main.component.scss']
})
export class MainComponent implements OnInit {

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
    this.router.navigate(["/teams/boards", this.newBoard])
    this.newBoard = null
    this.load()
  }

}
