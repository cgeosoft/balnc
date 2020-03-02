import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MenuItem } from '@balnc/shared'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { BoardStats } from '../@shared/models/board-stats'
import { BoardsRepo } from '../@shared/repos/boards.repo'

@Component({
  selector: 'app-boards-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']

})
export class ShellComponent implements OnInit {

  boards$: Observable<MenuItem[]>

  nickname: string
  boardsStats: BoardStats[]
  unread = {}
  menu = [
    {
      label: 'Boards',
      type: 'button',
      icon: 'border-all',
      url: '/boards/manage'
    },
    {
      label: 'Settings',
      type: 'button',
      icon: 'cog',
      url: '/boards/settings'
    }
  ]

  constructor (
    private boardsRepo: BoardsRepo,
    private router: Router
  ) { }

  async ngOnInit () {
    this.nickname = 'chris'
    this.boards$ = this.boardsRepo
      .all$({ mark: true })
      .pipe(
        tap(boards => boards.sort((a, b) => a._date - b._date)),
        map((data) => {
          return data.map(item => {
            return {
              label: item.c.name,
              icon: ['fas', 'comments'],
              url: ['/boards', item._id],
              type: 'button'
            }
          })
        })
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

    //     if (m._date > bs1.lastread && this.boardsService.selected !== m.board) {
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
