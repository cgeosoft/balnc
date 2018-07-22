import { Injectable,NgZone } from "@angular/core"
import { RxCollection } from 'rxdb'

import { ConfigService, DatabaseService } from "@balnc/common"

import { RxMessageDoc, Message } from "../models/message"
import { RxBoardDoc, Board } from "../models/board"
import { Subject, Observable } from "rxjs";

@Injectable()
export class BoardService {

    boardCol: RxCollection<RxBoardDoc>
    messageCol: RxCollection<RxMessageDoc>

    nickname: string;

    boards: Board[]
    boards$: Subject<Board[]>
    messages: any

    constructor(
        private ngZone: NgZone,
        private dbService: DatabaseService,
        private configService: ConfigService,
    ) {
        this.setup()
    }

    async setup() {

        this.nickname = this.configService.username

        this.boardCol = await this.dbService.get<RxBoardDoc>("board")
        this.messageCol = await this.dbService.get<RxMessageDoc>("message")

        this.boardCol.$.subscribe(async (dbItem) => {
            console.log(dbItem)
            await this.loadBoards()
        })
        await this.loadBoards()

        const messageDefaultArray = {}
        this.boards.forEach(b => {
            messageDefaultArray[b.name] = []
        })

        const messagesRaw = await this.messageCol.find().exec()
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

        this.messageCol.$.subscribe(dbItem => {
            const message = dbItem.data.v as Message
            if (!message) { return }
            this.messages[message.board].push(message)
            this.updateBoard(message.board, {
                lastMessage: message
            })
        })
    }

    async loadBoards(){
        let boards = await this.boardCol.find().exec() as Board[]
        this.ngZone.run(()=>{
this.boards =boards
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

        await this.boardCol.newDocument(_boardDoc).save()
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
        const existBoard = await this.boardCol.findOne().where('name').eq(boardName).exec()
        Object.assign(existBoard, newItem)
        await existBoard.save()
    }

    async sendMessage(message: any) {
        const _message: RxMessageDoc = Object.assign({}, message)
        _message.sendAt = (new Date()).getTime()
        await this.messageCol.newDocument(_message).save()
    }
}
