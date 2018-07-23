import { Injectable, NgZone } from '@angular/core'
import { RxCollection } from 'rxdb'

import { ConfigService, DatabaseService } from '@balnc/common'

import { RxMessageDoc, Message } from '../models/message'
import { RxBoardDoc, Board, BoardWithMessages } from '../models/board'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class BoardService {

  boardCol: RxCollection<RxBoardDoc>
  messageCol: RxCollection<RxMessageDoc>

  nickname: string

  boards$: BehaviorSubject<BoardWithMessages[]> = new BehaviorSubject<BoardWithMessages[]>([])

  constructor (
    private ngZone: NgZone,
    private dbService: DatabaseService,
    private configService: ConfigService
  ) {
    this.setup()
  }

  async setup () {
    this.nickname = this.configService.profile.remote.username
    this.boardCol = await this.dbService.get<RxBoardDoc>('board')
    this.messageCol = await this.dbService.get<RxMessageDoc>('message')

    await this.loadBoards()
    await this.loadSubscriptions()
  }

  async loadSubscriptions () {
    this.boardCol.$.subscribe(async (ev) => {
      await this.loadBoards()
      // this.ngZone.run(() => { })
    })

    this.messageCol.$.subscribe(async (ev) => {
      let message: Message = ev.data.v as Message
      let board = this.boards$.value.find(b => b.name === message.board)
      if (board) {
        board.messages$.next(board.messages$.getValue().concat([message]))
        this.ngZone.run(() => {})
      }
    })
  }

  async loadBoards () {
    let boards = await this.boardCol.find().exec() as BoardWithMessages[]
    boards.forEach(async b => {
      const messages = await this.loadMessages(b.name)
      b.messages$ = new BehaviorSubject<Message[]>(messages)
    })
    // this.ngZone.run(() => {
    this.boards$.next(boards)
    // })
  }

  async loadMessages (boardName: String) {
    let query = this.messageCol.find().where('board').eq(boardName)
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

  getBoard (boardName: any) {
    let board = this.boards$.value.find(b => b.name === boardName)
    return board
  }

  async createBoard (board: any) {
    const _board = Object.assign({
      created: (new Date()).getTime(),
      members: [{
        name: this.nickname,
        type: 'ADMIN',
        lastView: (new Date()).getTime()
      }],
      lastMessage: {}
    }, board)
    const _boardDoc: RxBoardDoc = Object.assign({}, _board)
    await this.boardCol.newDocument(_boardDoc).save()
  }

  async joinBoard (boardName: any) {
    let board = this.boards$.value.find(b => b.name === boardName)
    const _member = board.members.find(m => {
      return m.name === this.nickname
    })

    if (!_member) {
      board.members.push({
        name: this.nickname,
        type: 'MEMBER',
        lastView: (new Date()).getTime()
      })
    } else {
      _member.lastView = (new Date()).getTime()
    }

    await this.updateBoard(boardName, {
      members: board.members
    })
  }

  async updateBoard (boardName, newItem: Board) {
    let existBoard = await this.boardCol.findOne().where('name').eq(boardName).exec()
    existBoard = Object.assign(existBoard, newItem)
    await existBoard.save()
  }

  async sendMessage (message: Message) {
    const _message: RxMessageDoc = Object.assign({}, message as RxMessageDoc)
    _message.sendAt = (new Date()).getTime()
    await this.messageCol.newDocument(_message).save()
  }
}
