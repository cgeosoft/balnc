import { Injectable, Injector } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { RxCollection } from 'rxdb'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import * as moment from 'moment'

import { Entity } from "@balnc/common/models/entity"
import { DatabaseService } from "@balnc/common/services/database.service"
import { BaseService } from "@balnc/common/services/base.service"
import { ProfileService } from "@balnc/core/profile/services/profile.service"

import { RxMessageDoc, MessageSchema, Message } from "@balnc/teams/boards/models/message"
import { RxBoardDoc, BoardSchema, Board } from "@balnc/teams/boards/models/board"

@Injectable()
export class BoardService extends BaseService {

    nickname: string;
    boards: Board[]
    messages: any

    constructor(
        private injector: Injector,
        private http: HttpClient,
        private profileService: ProfileService,
    ) {
        super(injector)
        this._module = "@balnc/teams"
        this._entities = [{
            name: 'board',
            schema: BoardSchema,
            sync: true,
        }, {
            name: 'message',
            schema: MessageSchema,
            sync: true,
        }]
    }

    async setup() {
        await super.setup()

        this.nickname = this.profileService.getCurrent().database.user

        const boardCol = this._data["board"] as RxCollection<RxBoardDoc>
        this.boards = await boardCol.find().exec() as Board[]
        boardCol.$.subscribe(async (dbItem) => {
            this.boards = await boardCol.find().exec() as Board[]
        })

        const messageDefaultArray = {}
        this.boards.forEach(b => {
            messageDefaultArray[b.name] = []
        })

        const messageCol = this._data["message"] as RxCollection<RxMessageDoc>
        const messagesRaw = await messageCol.find().exec()
        const messages = messagesRaw
            .sort((a, b) => {
                if (a.sendAt < b.sendAt) { return -1 }
                if (a.sendAt > b.sendAt) { return 1 }
                return 0
            })
            .reduce((_bs, msg) => {
                if (!_bs[msg.board]) {
                    _bs[msg.board] = []
                }
                _bs[msg.board].push(msg)
                return _bs
            }, {})

        this.messages = Object.assign(messageDefaultArray, messages)

        messageCol.$.subscribe(dbItem => {
            const message = dbItem.data.v as Message
            this.messages[message.board].push(message)
            this.updateBoard(message.board, {
                lastMessage: message
            })
            // console.log("boards",this.boards)
        })
    }

    async createBoard(board: any) {
        const _board = Object.assign({
            created: (new Date()).getTime(),
            members: [{
                name: this.nickname,
                type: "ADMIN",
                lastView: (new Date()).getTime(),
            }],
            lastMessage: {}
        }, board)
        this.boards.push(_board)
        this.messages[board.name] = []
        const _boardDoc: RxBoardDoc = Object.assign({}, _board)
        await super.add<RxBoardDoc>("board", _boardDoc)
    }

    async joinBoard(boardName: any) {
        const _board = this.boards.find(b => {
            return b.name === boardName
        })

        if (!_board) {
            throw new Error('No board was found')
        }

        const _member = _board.members.find(m => {
            return m.name === this.nickname
        })

        if (!_member) {
            _board.members.push({
                name: this.nickname,
                type: "MEMBER",
                lastView: (new Date()).getTime(),
            })
        } else {
            _member.lastView = (new Date()).getTime()
        }

        await this.updateBoard(boardName, {
            members: _board.members
        })
    }

    async updateBoard(boardName, newItem: Board) {
        const boardCol = this._data["board"] as RxCollection<RxBoardDoc>
        const existBoard = await boardCol.findOne().where('name').eq(boardName).exec()
        Object.assign(existBoard, newItem)
        await existBoard.save()
    }

    async sendMessage(message: any) {
        const _message: RxMessageDoc = Object.assign({}, message)
        _message.sendAt = (new Date()).getTime()
        await super.add<RxMessageDoc>("message", _message)
    }
}
