import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection } from 'rxdb'

import * as _ from 'lodash'
import * as moment from 'moment'

import { DatabaseService } from '@blnc/core/database/services/database.service'

import { RxChatMessageDocument } from '../../data/message'
import { ChatService } from '@blnc/teams/chat/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('chatMessages') private chatMessages: ElementRef
  @ViewChild('chatInput') private chatInput: ElementRef

  // db
  room: RoomViewModel = new RoomViewModel()
  rooms: RoomViewModel[] = []
  sub: Subscription
  inputs: string[] = []
  user: any

  constructor(
    private chatService: ChatService,
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

    if (!this.room.inputMsg.text) { return }
    this.room.inputMsg.isDisabled = true

    await this.chatService.sendMessage({
      room: this.room.name,
      sender: this.user.name,
      text: this.room.inputMsg.text
    })

    this.room.inputMsg.isDisabled = false
    this.room.inputMsg.text = null
    this.zone.run(() => {
      this.scrollToBottom()
      this.chatInput.nativeElement.focus()
    })
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.send()
    }
  }

  private async _show() {
    const messages$ = await this.chatService.getMessages()

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
