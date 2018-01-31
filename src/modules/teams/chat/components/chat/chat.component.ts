import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import * as _ from 'lodash'
import * as moment from 'moment'

import { DatabaseService } from '../../../../_core/database/database.service'
import { RxChatMessageDocument } from '../../data/message'
import { RxCollection } from 'rxdb'
import { Date, setTimeout } from 'core-js/library/web/timers'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('chatMessages') private chatMessages: ElementRef
  @ViewChild('chatInput') private chatInput: ElementRef

  // db
  db: RxCollection<RxChatMessageDocument>
  room: RoomViewModel = new RoomViewModel()
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

  public async send() {
    const room = this.room
    if (!room.inputMsg.text) { return }
    room.inputMsg.isDisabled = true

    const doc = this.db.newDocument({
      room: room.name,
      sendAt: moment().toISOString(),
      sender: this.user.name,
      text: room.inputMsg.text
    })

    await doc.save()
      .then(() => {
        room.inputMsg.isDisabled = false
        room.inputMsg.text = null
        this.zone.run(() => {
          this.scrollToBottom()
          this.chatInput.nativeElement.focus()
        })
      })
  }
  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.send()
    }
  }

  private async _show() {

    this.db = await this.database.get<RxChatMessageDocument>("message")
    const messages$ = this.db.find().$

    this.sub = messages$
      .subscribe(messages => {
        const rooms = _.chain(messages)
          .sortBy("sendAt")
          // .reverse()
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
          this.room = rooms[0]
          this.scrollToBottom()
          this.chatInput.nativeElement.focus()
        })
      })
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight
        console.log("scrolled")
      }, 100)
    } catch (err) {
      console.error(err)
    }
  }
}

class RoomViewModel {
  name: string
  messages: RxChatMessageDocument[]
  inputMsg: RoomViewInputModel
  constructor(init?: Partial<RoomViewModel>) {
    this.inputMsg = new RoomViewInputModel()
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
