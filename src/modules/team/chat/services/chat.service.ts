import { DatabaseConfig } from '@balnc/core/profile/data/profile';
import { Subject } from "rxjs/Subject";
import { RxCollection, RxReplicationState, RxDocumentBase } from "rxdb"
import { Observable, } from "rxjs/Observable";
import { Injectable, OnDestroy, OnInit, Injector } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

import * as moment from 'moment'

import { RxChatMessageDoc, ChatMessageSchema, ChatMessage } from "../data/message"
import { Entity } from "@balnc/common/models/entity";
import { DatabaseService } from "@balnc/common/services/database.service";
import { BaseService } from "@balnc/common/services/base.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient } from "@angular/common/http";
import { ProfileService } from "@balnc/core/profile/services/profile.service";

const entities: Entity[] = [{
    name: 'message',
    schema: ChatMessageSchema,
    sync: true,
}]

@Injectable()
export class ChatService extends BaseService {

    isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

    constructor(
        private injector: Injector,
        private http: HttpClient,
        private profileService: ProfileService,
    ) {
        super(injector)
        this._module = "@balnc/team"
        this._entities = [{
            name: 'message',
            schema: ChatMessageSchema,
            sync: true,
        }]
    }

    async all(params: any = {}) {
        return await super.all<RxChatMessageDoc>("message", params)
    }

    all$(params: any = {}) {
        const collection = this._data["message"] as RxCollection<RxChatMessageDoc>
        return collection
    }

    async sendMessage(message: any) {
        const msg: RxChatMessageDoc = Object.assign({}, message)
        msg.sendAt = (new Date()).getTime()
        await super.add<RxChatMessageDoc>("message", msg)
    }
}
