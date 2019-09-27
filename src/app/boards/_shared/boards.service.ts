import { Injectable, NgZone } from '@angular/core'
import { ConfigService, RxDBService } from '@balnc/core'
import { CommonService } from '@balnc/shared'
import { LocalStorage } from 'ngx-store'
import { Board } from './models/board'
import { BoardsEntities } from './models/entities'
import { Message } from './models/message'

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
  constructor (
    zone: NgZone,
    dbService: RxDBService,
    private configService: ConfigService
  ) {
    super(zone, dbService)
  }

  async setup () {
    await super.setup({
      alias: 'boards',
      entities: BoardsEntities
    })
    this.nickname = this.configService.profile.remote.username || 'anonymous'

    super.getAll$<Message>('messages').subscribe((messages) => {
      console.log('caclulate unread')
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

  async createBoard (data: Board) {
    const now = new Date()
    const board = Object.assign({
      created: Date.now(),
      // members: [{
      //   name: this.nickname,
      //   type: 'ADMIN',
      //   lastView: now.getTime()
      // }],
      // lastMessage: {}
    }, data)

    const b = await super.addOne('boards', board)
    return b['_id']
  }

  selectBoard (boardId) {
    const bs = [...this.boardsStats]
    let bs1 = bs.find(x => x.id === boardId)
    if (!bs1) {
      bs1 = {
        id: boardId,
        lastread: 0,
        unread: 0
      }
      bs.push(bs1)
    }
    bs1.unread = 0
    bs1.lastread = Date.now()
    this.boardsStats = [...bs]
    this.selectedBoard = boardId
  }

  async deleteBoard (id) {
    let board = await this.db['boards'].findOne(id).exec()
    board.remove()

    let messages = await this.db['messages'].find().where('board').eq(id).exec()
    messages.forEach(m => {
      m.remove()
    })
  }
}
