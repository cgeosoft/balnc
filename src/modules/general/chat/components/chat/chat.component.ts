import { Component, NgZone, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import * as RxDBTypes from '../../typings/typings.d'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  messages: RxDBTypes.RxMessageDocument[] | RxDBTypes.RxMessageDocument
  rooms: RxDBTypes.RxRoomDocument[] | RxDBTypes.RxRoomDocument
  subscriptions: Subscription[]

  constructor(
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this._show()
  }

  ngOnDestroy() {
    if (this.subscriptions.length) {
      this.subscriptions.forEach(s => s.unsubscribe())
    }
  }

  private async _show() {
    // const db = await this.db.get()

    // const messageSubscrition = db.messages
    //   .find().$
    //   .subscribe(messages => {
    //     this.messages = messages
    //   })
    // this.subscriptions.push(messageSubscrition)

    // const rooms$ = db.rooms.find().$
    // const roomSubscrition = rooms$.subscribe(rooms => {
    //   console.log("new room", rooms)
    //   this.zone.run(() => { this.rooms = rooms })
    // })
    // this.subscriptions.push(roomSubscrition)
  }
}
