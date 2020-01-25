import { Component, OnInit } from '@angular/core'
import { TableSchema } from '@balnc/shared'
import { Observable } from 'rxjs'
import { Board } from '../@shared/models/board'
import { BoardsRepo } from '../@shared/repos/boards.repo'

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html'
})
export class BoardsComponent implements OnInit {

  schema: TableSchema = {
    name: 'boards',
    properties: [
      { label: 'Name', val: (item: Board) => item.name }
    ]
  }

  boards$: Observable<Board[]> = new Observable<Board[]>()

  constructor(
    private boardsRepo: BoardsRepo
  ) { }

  ngOnInit() {
    this.boards$ = this.boardsRepo.all$()
  }

  create() { }

}
