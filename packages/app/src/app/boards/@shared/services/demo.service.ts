import { Injectable } from '@angular/core'
import * as faker from 'faker'
import { BoardsRepo } from '../repos/boards.repo'
import { MessagesRepo } from '../repos/messages.repo'

@Injectable()
export class DemoService {

  NO_OF_BOARDS = 5
  NO_OF_CUSTOMERS = 20

  generated = false

  constructor (
    private boardsRepo: BoardsRepo,
    private messagesRepo: MessagesRepo
  ) { }

  async generate () {

    console.log(`Generate: ${this.NO_OF_BOARDS} boards`)

    for (let b = 0; b < this.NO_OF_BOARDS; b++) {
      const board = await this.boardsRepo.add({
        name: `${faker.hacker.ingverb()} ${faker.hacker.noun()}`
      })
      console.log(` - Added board ${board._id}`)

      console.log(`Generate: ${this.NO_OF_CUSTOMERS} messages for ${board._id}`)

      const users = []
      for (let u = 0; u < 5; u++) {
        users.push(faker.internet.userName())
      }

      for (let c = 0; c < this.NO_OF_CUSTOMERS; c++) {

        const data = {
          text: faker.hacker.phrase(),
          sender: users[faker.random.number(4)],
          board: board._id,
          status: 'SEND',
          type: 'MESSAGE'
        }
        const message = await this.messagesRepo.add(data, board._id, faker.date.past().getTime())
        console.log(` - Added: message ${c}:${message._id} to board ${board._id}`)
      }
    }

    this.generated = true
  }
}
