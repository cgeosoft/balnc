import { Injectable } from '@angular/core'
import { RxDBService } from '@balnc/core'
import { CommonService } from '@balnc/shared'
import * as faker from 'faker'
import { LocalStorage } from 'ngx-store'
import { Board } from './models/board'
import { BoardStats } from './models/board-stats'

@Injectable()
export class BoardsService extends CommonService<Board> {

  @LocalStorage() boardsStats: BoardStats[] = []

  selectedBoard: string
  selected: string

  constructor(
    dbService: RxDBService
  ) {
    super(dbService)
    this.type = 'board'
  }

  async generateDemoData(size = 5) {
    console.log(`Generate: ${size} boards`)

    for (let b = 0; b < 5; b++) {
      const board = await this.add({
        key: faker.random.uuid(),
        name: faker.name.findName()
      })
      console.log(` - Added board ${board._id}`)
    }
  }
}
