import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Board } from '../@shared/models/board'
import { BoardStats } from '../@shared/models/board-stats'
import { BoardsRepo } from '../@shared/repos/boards.repo'
import { MessagesRepo } from '../@shared/repos/messages.repo'

@Component({
  selector: 'app-boards-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']

})
export class ShellComponent implements OnInit {

  boards$: Observable<Board[]>

  nickname: string
  boardsStats: BoardStats[]
  unread = {}

  constructor (
    private boardsRepo: BoardsRepo,
    private messagesRepo: MessagesRepo,
    private router: Router
  ) { }

  async ngOnInit () {
    this.nickname = 'chris'
    this.boards$ = this.boardsRepo.all$().pipe(
      tap(boards => boards.sort((a, b) => a._timestamp - b._timestamp))
    )
    // await this.generate()
    // this.messagesService.all$().subscribe((messages) => {
    //   let bs = this.boardsStats
    //   bs.forEach(b => { b.unread = 0 })
    //   messages.forEach(m => {
    //     let bs1 = bs.find(x => x.id === m.board)
    //     if (!bs1) {
    //       bs1 = {
    //         id: m.board,
    //         lastread: 0,
    //         unread: 0
    //       }
    //       bs.push(bs1)
    //     }

    //     if (m._timestamp > bs1.lastread && this.boardsService.selected !== m.board) {
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

  async create (name: string) {
    if (!name) return
    const board = await this.boardsRepo.add({
      name
    })
    name = null
    await this.router.navigate(['/boards', board._id])
  }
}
