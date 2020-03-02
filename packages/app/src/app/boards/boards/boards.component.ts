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

  boards$: Observable<Board[]> = new Observable<Board[]>()
  schema: TableSchema = {
    name: 'boards',
    properties: [
      {
        label: 'Name', type: 'link', val: (item: Board) => {
          return {
            label: item.name,
            link: ['/boards', item._id]
          }
        }
      }
    ]
  }

  constructor (
    private boardsRepo: BoardsRepo
  ) { }

  ngOnInit () {
    this.boards$ = this.boardsRepo.all$()
  }

  create () {
    // todo
  }

}
