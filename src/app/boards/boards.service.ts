import { Injectable, NgZone } from '@angular/core';
import { ConfigService, RxDBService } from '@balnc/core';
import { CommonService } from '@balnc/shared';
import { LocalStorage } from 'ngx-store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Board } from './models/board';
import { BoardsEntities } from './models/entities';
import { Message } from './models/message';

@Injectable()
export class BoardsService extends CommonService {

  @LocalStorage() nickname: string = ''

  boards$: Observable<Board[]>
  messages$: Observable<Message[]>

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
      entities: BoardsEntities
    })
    this.nickname = this.configService.profile.remote.username || "anonymous"
    this.boards$ = this.db['boards'].find().$
    this.messages$ = this.db['messages'].find().$
      .pipe(
        tap(messages => {
          messages.sort((a, b) => a.timestamp - b.timestamp)
        })
      )
  }

  async loadMessages(boardName: String) {
    let query = this.db['messages'].find().where('board').eq(boardName)
    const messagesRaw = await query.exec()
    const messages: Message[] = messagesRaw
      .sort((a, b) => {
        if (a.sendAt < b.sendAt) { return -1 }
        if (a.sendAt > b.sendAt) { return 1 }
        return 0
      })
    // let board = this.boards$.value.find(b => b.name === boardName)
    // if (board) {
    //   board.messages$.next(board.messages$.getValue().concat(messages))
    // }
    return messages
  }

  getBoard(id: string) {
    let board = super.getOne('boards', id)
    return board
  }

  async createBoard(data: Board) {
    const now = new Date()
    const board = Object.assign({
      created: now.getTime(),
      members: [{
        name: this.nickname,
        type: 'ADMIN',
        lastView: now.getTime()
      }],
      lastMessage: {}
    }, data)

    await super.addOne('boards', board)
  }

  // async joinBoard (boardName: any) {
  //   let board = this.db['boards'].find(b => b.name === boardName)
  //   const _member = board.members.find(m => {
  //     return m.name === this.nickname
  //   })

  //   if (!_member) {
  //     board.members.push({
  //       name: this.nickname,
  //       type: 'MEMBER',
  //       lastView: (new Date()).getTime()
  //     })
  //   } else {
  //     _member.lastView = (new Date()).getTime()
  //   }

  //   await this.updateBoard(boardName, {
  //     members: board.members
  //   })
  // }

  // async updateBoard (boardName, newItem: Board) {
  //   let existBoard = await this.boards.findOne().where('name').eq(boardName).exec()
  //   existBoard = Object.assign(existBoard, newItem)
  //   await existBoard.save()
  // }

  async sendMessage(message: Message) {
    await super.addOne('messages', message)
  }

  async deleteBoard(boardName) {
    let existBoard = await this.db['boards'].findOne().where('name').eq(boardName).exec()
    existBoard.remove()

    let messages = await this.db['messages'].find().where('board').eq(boardName).exec()
    if (messages.length) {
      messages.forEach(m => {
        m.remove()
      })
    }
  }
}
