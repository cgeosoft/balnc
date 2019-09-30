import { Injectable, NgZone } from '@angular/core'
import { Board } from '@balnc/commons/boards/models/board'
import { Message } from '@balnc/commons/boards/models/message'
import { ConfigService, RxDBService } from '@balnc/core'
import { CommonService } from '@balnc/shared'
import * as faker from 'faker'
import { LocalStorage } from 'ngx-store'
import { Entities } from './models/entities'

export interface BoardStats {
  id: string
  lastread?: number
  unread?: number
}

@Injectable()
export class BoardsService extends CommonService {

  @LocalStorage() nickname: string = ''
  @LocalStorage() boardsStats: (Board & BoardStats)[] = []
  selectedBoard: string
  constructor(
    zone: NgZone,
    dbService: RxDBService,
    private configService: ConfigService
  ) {
    super(zone, dbService)
  }

  async setup() {
    await super.setup({
      alias: 'boards',
      entities: Entities
    })
    this.nickname = this.configService.profile.remote.username || 'anonymous'

    super.getAll$<Message>('messages').subscribe((messages) => {
      const bs = [...this.boardsStats]
      bs.forEach(b => { b.unread = 0 })
      messages.forEach(m => {
        let bs1 = bs.find(x => x.id === m.board)
        if (!bs1) {
          bs1 = {
            id: m.board,
            lastread: 0,
            unread: 0
          }
          bs.push(bs1)
        }

        if (m.timestamp > bs1.lastread && this.selectedBoard !== m.board) {
          bs1.unread++
        }
      })
      this.boardsStats = [...bs]
    })

  }

  async createBoard(data: Board) {
    const now = new Date()
    const board = Object.assign({
      created: Date.now()
      // members: [{
      //   name: this.nickname,
      //   type: 'ADMIN',
      //   lastView: now.getTime()
      // }],
      // lastMessage: {}
    }, data)

    const b = await super.addOne('boards', board)
    return b
  }

  selectBoard(boardId) {
    let bs1 = this.boardsStats.find(x => x.id === boardId)
    if (!bs1) {
      bs1 = {
        id: boardId,
        lastread: 0,
        unread: 0
      }
      this.boardsStats.push(bs1)
    }
    bs1.unread = 0
    bs1.lastread = Date.now()
    this.selectedBoard = boardId
  }

  async deleteBoard(id) {
    let board = await this.db['boards'].findOne(id).exec()
    board.remove()

    let messages = await this.db['messages'].find().where('board').eq(id).exec()
    messages.forEach(m => {
      m.remove()
    })
  }

  async generateDemoData(size = 5) {
    console.log(`generate ${size} boards`)

    for (let b = 0; b < 5; b++) {
      const board = await this.createBoard({
        name: faker.name.findName()
      })
      console.log(`add board ${board}:${board.get('_id')}`)

      const rotation = faker.random.number({ min: 0, max: 1 }) === 1 ? '1024/768' : '768/1024'

      console.log(`generate ${size * 7} messages for ${board.get('_id')}`)
      for (let c = 0; c < size * 7; c++) {

        const messageData: Message = {
          timestamp: faker.date.past().getTime(),
          text: faker.hacker.phrase(),
          sender: faker.internet.userName(),
          board: board.get('_id'),
          status: 'SEND',
          type: 'MESSAGE'
        }
        const message = await this.addOne('messages', messageData)

        console.log(`add message ${c}:${message.get('_id')} to project ${board.get('_id')}`)
      }
    }
  }
}
