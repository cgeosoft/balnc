import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Board } from '../_shared/models/board'
import { BoardStats } from '../_shared/models/board-stats'
import { BoardsRepo } from '../_shared/repos/boards.repo'
import { MessagesRepo } from '../_shared/repos/messages.repo'

@Component({
  selector: 'app-boards-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  host: { 'class': 'shell' }
})
export class ShellComponent implements OnInit {

  boards$: Observable<Board[]>

  nickname: string
  boardsStats: BoardStats[]
  unread = {}

  constructor(
    private boardsRepo: BoardsRepo,
    private messagesRepo: MessagesRepo,
    private router: Router
  ) { }

  async ngOnInit() {
    this.nickname = 'chris'
    this.boards$ = this.boardsRepo.all$()
    await this.generate()
    // this.messagesService.all$().subscribe((messages) => {
    //   let bs = this.boardsStats
    //   bs.forEach(b => { b.unread = 0 })
    //   messages.forEach(m => {
    //     let bs1 = bs.find(x => x.id === m.data.board)
    //     if (!bs1) {
    //       bs1 = {
    //         id: m.data.board,
    //         lastread: 0,
    //         unread: 0
    //       }
    //       bs.push(bs1)
    //     }

    //     if (m.timestamp > bs1.lastread && this.boardsService.selected !== m.data.board) {
    //       bs1.unread++
    //     }
    //   })
    //   this.boardsStats = bs
    // })
  }

  // unread(boardid: string) {
  //   const s = this.boardsService.boardsStats.find(x => x.id === boardid)
  //   return s ? s.unread : 0
  // }

  async create(name: string) {
    if (!name) return
    const board = await this.boardsRepo.add({
      name
    })
    name = null
    await this.router.navigate(['/boards', board._id])
  }

  async generate() {
    await this.boardsRepo.generateDemoData()
    const boards = await this.boardsRepo.all()
    boards.forEach(async b => {
      await this.messagesRepo.generateDemoData(b)
    })
    await this.router.navigate(['/boards', boards[0]._id])
  }
}
