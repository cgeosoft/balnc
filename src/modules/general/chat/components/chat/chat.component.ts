import { Component, NgZone, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import * as _ from 'lodash'

import { DatabaseService } from '../../../../_core/modules/database/database.service'
import { RxChatMessageDocument } from '../../data/message'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.compoenent.html',
  styleUrls: ['./chat.compoenent.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  rooms: any[] = []
  sub: Subscription

  constructor(
    private db: DatabaseService,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this._show()
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  private async _show() {

    const db = await this.db.get<RxChatMessageDocument>("message")
    const messages$ = db.find().$

    this.sub = messages$
      .subscribe(messages => {
        const rooms = _.chain(messages)
          .groupBy((i) => {
            return i.room
          })
          .map((msgs, roomName) => {
            return {
              name: roomName,
              messages: msgs,
            }
          })
          .value()
        this.zone.run(() => {
          this.rooms = rooms
        })
      })
  }
}
