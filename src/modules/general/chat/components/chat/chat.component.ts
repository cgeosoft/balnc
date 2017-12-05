import { Component, NgZone, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import * as _ from 'lodash'
import * as moment from 'moment'

import { DatabaseService } from '../../../../_core/modules/database/database.service'
import { RxChatMessageDocument } from '../../data/message'
import { RxCollection } from 'rxdb';
import { Date } from 'core-js/library/web/timers';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.compoenent.html',
  styleUrls: ['./chat.compoenent.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  // db
  db: RxCollection<RxChatMessageDocument>
  rooms: RoomViewModel[] = []
  sub: Subscription
  inputs: string[] = []
  user: any

  constructor(
    private database: DatabaseService,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this._show()
    this.user = {
      name: `user_${_.random(10000, 99999)}`
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  public async send(room: RoomViewModel) {

    room.inputMsg.isDisabled = true

    const doc = this.db.newDocument({
      room: room.name,
      sendAt: moment().toISOString(),
      sender: this.user.name,
      text: room.inputMsg.text
    });

    await doc.save().then(() => {
      room.inputMsg.isDisabled = false
      room.inputMsg.text = null
    });
  }

  private async _show() {

    this.db = await this.database.get<RxChatMessageDocument>("message")
    const messages$ = this.db.find().$

    this.sub = messages$
      .subscribe(messages => {
        const rooms = _.chain(messages)
          .sortBy("sendAt")
          .reverse()
          .groupBy(i => {
            return i.room
          })
          .map((msgs, roomName) => {
            return new RoomViewModel({
              name: roomName,
              messages: msgs,
              inputMsg: new RoomViewInputModel({
                text: null,
                isDisabled: false,
              })
            })
          })
          .sortBy("name")
          .value()
        this.zone.run(() => {
          this.rooms = rooms
        })
      })
  }
}

class RoomViewModel {
  name: string
  messages: RxChatMessageDocument[]
  inputMsg: RoomViewInputModel
  constructor(init?: Partial<RoomViewModel>) {
    Object.assign(this, init)
  }
}

class RoomViewInputModel {
  text: string
  isDisabled: boolean
  constructor(init?: Partial<RoomViewInputModel>) {
    Object.assign(this, init)
  }
}
