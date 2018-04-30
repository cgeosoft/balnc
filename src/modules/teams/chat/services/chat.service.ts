import { Subject } from "rxjs/Subject";
import { RxCollection, RxReplicationState, RxDocumentBase } from "rxdb"
import { Observable, } from "rxjs/Observable";
import { Injectable, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

import * as moment from 'moment'

import { RxChatMessageDocument, ChatMessageSchema } from "../data/message"
import { Entity } from "@blnc/core/common/models/entity";
import { DatabaseService } from "@blnc/core/common/services/database.service";

const entities: Entity[] = [{
    name: 'message',
    schema: ChatMessageSchema,
    sync: true,
}]

@Injectable()
export class ChatService implements Resolve<any> {

    chatMessages: RxCollection<RxChatMessageDocument>

    constructor(
        private dbService: DatabaseService,
    ) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
        await this.setup()
        return true
    }

    async setup() {
        await this.dbService.loadEntities(entities)
        this.chatMessages = await this.dbService.get<RxChatMessageDocument>("message")
    }

    async getMessages(params?: any) {
        return this.chatMessages.find(params).$
    }

    async sendMessage(message) {
        message.sendAt = moment().toISOString()
        const doc = this.chatMessages.newDocument(message)
        await doc.save()
    }
}
