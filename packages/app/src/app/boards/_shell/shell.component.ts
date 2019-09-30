import { Component, NgZone, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Board } from '@balnc/commons/boards/models/board'
import { Observable } from 'rxjs'
import { BoardsService, BoardStats } from '../_shared/boards.service'

@Component({
  selector: 'app-boards-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  host: { 'class': 'shell' }
})
export class ShellComponent implements OnInit {

  boards$: Observable<Board[]>

  nickname: string
  boardsStats: (Board & BoardStats)[]

  constructor(
    private boardService: BoardsService,
    private router: Router,
    private zone: NgZone
  ) { }

  unread(boardid: string) {
    const s = this.boardService.boardsStats.find(x => x.id === boardid)
    return s ? s.unread : 0
  }

  ngOnInit() {
    this.nickname = this.boardService.nickname
    this.boards$ = this.boardService.getAll$<Board>('boards')
  }

  async create(name) {
    if (!name) return
    const board = await this.boardService.createBoard({
      name: name
    })
    name = null
    await this.router.navigate(['/boards', board.get('id')])
  }

  async generate() {
    await this.boardService.generateDemoData()
  }
}
