import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import * as faker from 'faker'
import { LocalStorage } from 'ngx-store'
import { Board } from '../models/board'
import { BoardStats } from '../models/board-stats'
import { Message } from '../models/message'

@Injectable()
export class MessagesRepo extends Repository<Message> {

  @LocalStorage() nickname: string = ''
  @LocalStorage() boardsStats: BoardStats[] = []

  selectedBoard: string

  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'boards.message'
  }

  async generateDemoData(board: Board, size = 15) {
    console.log(`Generate: ${size} messages for ${board._id}`)
    for (let c = 0; c < size; c++) {

      const data = {
        text: faker.hacker.phrase(),
        sender: faker.internet.userName(),
        board: board._id,
        status: 'SEND',
        type: 'MESSAGE'
      }
      const message = await this.add(data, faker.date.past().getTime())
      console.log(` - Added: message ${c}:${message._id} to board ${board._id}`)
    }
  }
}
