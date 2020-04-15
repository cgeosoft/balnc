import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Board } from '../../@shared/models/board'
import { BoardsRepo } from '../../@shared/repos/boards.repo'
import { MessagesRepo } from '../../@shared/repos/messages.repo'

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit {

  board: Board

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardsRepo: BoardsRepo,
    private messagesRepo: MessagesRepo
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(async (params) => {
      this.board = await this.boardsRepo.one(params['id'])
    })
  }

  async save() {
    await this.boardsRepo.update(this.board._id, {
      name: this.board.name
    })
  }

  async deleteBoard() {
    if (!confirm('Are you sure? All message will be deleted')) return
    await this.boardsRepo.remove(this.board._id)

    const messages = await this.messagesRepo.all({ group: this.board._id })
    const ps = messages.map(m => this.messagesRepo.remove(m._id))
    await Promise.all(ps)

    await this.router.navigateByUrl('/boards')
  }
}
