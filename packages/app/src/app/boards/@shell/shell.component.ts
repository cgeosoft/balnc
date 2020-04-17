import { Component, NgZone, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { MenuItem } from '@balnc/shared'
import { combineLatest, Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { BoardStats } from '../@shared/models/board-stats'
import { BUser } from '../@shared/models/buser'
import { BoardsRepo } from '../@shared/repos/boards.repo'
import { BUsersRepo } from '../@shared/repos/buser.repo'
import { MessagesRepo } from '../@shared/repos/messages.repo'

@Component({
  selector: 'app-boards-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']

})
export class ShellComponent implements OnInit {

  boardsStats: BoardStats[]
  unread = {}
  menu: MenuItem[] = [{
    label: 'Create New Board',
    type: 'button',
    highlight: true,
    icon: 'plus-circle',
    action: () => {
      return this.create()
    }
  }]
  boards$: Observable<MenuItem[]>

  constructor (
    private boardsRepo: BoardsRepo,
    private router: Router,
    private configService: ConfigService,
    private messageRepo: MessagesRepo,
    private buserRepo: BUsersRepo,
    private zone: NgZone

  ) { }

  ngOnInit () {

    const boards$ = this.boardsRepo.allm$().pipe(
      tap((boards) => boards.sort((a, b) => a.name > b.name ? 1 : -1))
    )

    const messages$ = this.messageRepo.allm$().pipe(
      map((messages) => {
        messages.sort((a, b) => a._date - b._date)
        return messages.reduce((l, i) => {
          if (!l[i._group]) l[i._group] = []
          l[i._group].unshift(i)
          return l
        }, {})
      })
    )

    const lastRead$ = this.buserRepo.allm$({ group: this.configService.username }).pipe(
      map((busers: BUser[]) => {
        return busers.reduce((l, i) => {
          l[i.board] = i.lastread
          return l
        }, {})
      })
    )

    const gogos = 5000

    this.boards$ = combineLatest(
      [boards$, messages$, lastRead$]
    ).pipe(
      map(x => x[0].map(board => {
        const messages = x[1][board._id] ?? []
        const lastread = x[2][board._id] ?? 0
        const unread = messages
          .filter(m =>
            m._date > lastread &&
            m.sender !== this.configService.username).length
        return {
          label: board.name,
          sublabel: messages[0]?.text ?? 'no messages',
          icon: ['fas', 'comments'],
          iconColor: board.color,
          route: ['/boards', board._id],
          type: 'button',
          cssClass: unread ? 'bold' : '',
          note: (unread > 0) ? ((unread > 99) ? '99+' : unread) : ''
        } as MenuItem
      })
      ),
      tap(() => {
        this.zone.run(() => { })
      })

    )
  }

  // unread(boardid: string) {
  //   const s = this.boardsService.boardsStats.find(x => x.id === boardid)
  //   return s ? s.unread : 0
  // }

  async create () {
    console.log('create board')
    const board = await this.boardsRepo.add({
      name: 'New Board',
      creator: this.configService.username
    })
    await this.router.navigate(['/boards', board._id])
  }
}
