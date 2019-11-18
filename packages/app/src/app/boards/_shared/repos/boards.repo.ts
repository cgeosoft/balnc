import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import * as faker from 'faker'
import { LocalStorage } from 'ngx-store'
import { Board } from '../models/board'
import { BoardStats } from '../models/board-stats'

@Injectable()
export class BoardsRepo extends Repository<Board> {

  @LocalStorage() boardsStats: BoardStats[] = []

  selectedBoard: string
  selected: string

  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'boards.board'
  }

  async generateDemoData(size = 5) {
    console.log(`Generate: ${size} boards`)

    for (let b = 0; b < 5; b++) {
      const board = await this.add({
        name: faker.name.findName()
      })
      console.log(` - Added board ${board._id}`)
    }
  }
}
