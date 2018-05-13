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

@Injectable()
export class BoardService extends BaseService {

    nickname: string;
    boards: { name?: string, messages?: Message[], last?: Message }[] = []
    constructor(
        private injector: Injector,
        private http: HttpClient,
        private profileService: ProfileService,
    ) {
        super(injector)
        this._module = "@balnc/teams"
        this._entities = [{
            name: 'message',
            schema: MessageSchema,
            sync: true,
            migrationStrategies: {
                1: (oldDoc) => {
                    if (oldDoc.type === "COMMAND") {
                        oldDoc.type = "CMD-CREATE"
                        oldDoc.data = {
                            user: "???",
                        }
                    }
                    return oldDoc;
                }
            }
        }]
    }

    async setup() {
        await super.setup()

        this.nickname = this.profileService.getCurrent().database.user

        const collection = this._data["message"] as RxCollection<RxMessageDoc>
        const boardsRaw = await collection.find().exec()

        const _boards = boardsRaw
            .sort((a, b) => {
                if (a.sendAt < b.sendAt) { return -1 }
                if (a.sendAt > b.sendAt) { return 1 }
                return 0
            })
            .reduce((_bs, msg) => {
                if (!_bs[msg.board]) {
                    _bs[msg.board] = {
                        name: msg.board,
                        messages: [],
                        last: {}
                    }
                }
                _bs[msg.board].messages.push(msg)
                _bs[msg.board].last = msg
                return _bs
            }, {})

        this.boards = Object.keys(_boards).map(key => _boards[key])

        collection.$.subscribe(dbItem => {
            const message = dbItem.data.v as Message
            let board = this.boards.find(b => {
                return b.name === message.board
            })

            if (!board) {
                board = {
                    name: message.board,
                    messages: [],
                    last: {}
                }
                this.boards.push(board)
            }
            board.messages.push(message)
            board.last = message
        })
    }

    async all(params: any = {}) {
        return await super.all<RxMessageDoc>("message", params)
    }

    all$(params: any = {}) {
        const collection = this._data["message"] as RxCollection<RxMessageDoc>
        return collection
    }

    async send(board: any) {
        const msg: RxMessageDoc = Object.assign({}, board)
        msg.sendAt = (new Date()).getTime()
        await super.add<RxMessageDoc>("message", msg)
    }
}
