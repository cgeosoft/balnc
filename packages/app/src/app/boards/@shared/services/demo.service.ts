import { Injectable } from '@angular/core'
import { BulkObj } from '@balnc/core'
import * as faker from 'faker'
import { Subject } from 'rxjs'
import { BoardsRepo } from '../repos/boards.repo'
import { MessagesRepo } from '../repos/messages.repo'

const NO_OF_BOARDS = 50
const NO_OF_MESSAGES = 2000
const NO_OF_USERS = 20

@Injectable({
  providedIn: 'root'
})
export class BoardsDemoService {

  logs$ = new Subject<string>()

  constructor (
    private boardsRepo: BoardsRepo,
    private messagesRepo: MessagesRepo
  ) { }

  async clear () {
    this.message(`Calculate old demo data`)
    const boards = await this.boardsRepo.all()
    const boardIds = boards.filter(o => o._tags.indexOf('demo') !== -1).map(c => c._id)
    this.message(`Will remove ${boardIds.length} boards`)
    const boardsProm = boardIds.map((id, i) => {
      if (i % 100 === 0) {
        this.message(`Removed ${i}/${NO_OF_BOARDS} boards`)
      }
      return this.boardsRepo.remove(id)
    })
    const messages = await this.messagesRepo.all()
    const messageIds = messages.filter(o => o._tags.indexOf('demo') !== -1).map(a => a._id)
    this.message(`Will remove ${messageIds.length} messages`)
    const messagesProm = messageIds.map((id, i) => {
      if (i % 100 === 0) {
        this.message(`Removed ${i}/${NO_OF_MESSAGES} messages`)
      }
      return this.messagesRepo.remove(id)
    })
    this.message(`Remove old demo data`)
    await Promise.all([
      ...boardsProm,
      ...messagesProm
    ])
    this.message(`Old demo data removed`)
  }

  private message (message) {
    this.logs$.next(`[Boards] ${message}`)
  }

  async generate () {

    this.message('Start demo data generation')

    this.message(`Generate ${NO_OF_BOARDS} boards`)
    const boards: BulkObj[] = []
    for (let b = 0; b < NO_OF_BOARDS; b++) {
      boards.push({
        date: faker.date.past(2).getTime(),
        mark: faker.random.number(100) === 1,
        tags: ['demo'],
        content: {
          name: `${faker.hacker.ingverb()} ${faker.hacker.noun()}`
        }
      })
    }
    this.message(`Saving ${NO_OF_BOARDS} boards`)
    await this.boardsRepo.bulk(boards)

    const users = []
    for (let u = 0; u < NO_OF_USERS; u++) {
      users.push(faker.internet.userName())
    }

    const messages: BulkObj[] = []
    const boardSaved = await this.boardsRepo.all()
    const boardIds = boardSaved.map(b => b._id)
    for (let c = 0; c < NO_OF_MESSAGES; c++) {
      messages.push({
        date: faker.date.past(2).getTime(),
        mark: faker.random.number(100) === 1,
        tags: ['demo'],
        group: boardIds[faker.random.number(boardIds.length - 1)],
        content: {
          text: faker.hacker.phrase(),
          sender: users[faker.random.number(users.length - 1)],
          status: 'SEND',
          type: 'MESSAGE'
        }
      })
      if (c % 100 === 0) {
        this.message(`Generate ${c}/${NO_OF_MESSAGES} messages`)
      }
    }
    this.message(`Saving ${NO_OF_MESSAGES} messages`)
    await this.messagesRepo.bulk(messages)

    this.message(`Generation completed`)
  }
}
