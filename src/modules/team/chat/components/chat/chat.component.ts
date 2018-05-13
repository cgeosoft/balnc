import { Component, NgZone, OnDestroy, OnInit, ElementRef, ViewChild, Pipe, PipeTransform } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection } from 'rxdb'

import * as _ from 'lodash'
import * as moment from 'moment'


import { RxChatMessageDoc, ChatMessage } from '@balnc/team/chat/data/message'
import { ChatService } from '@balnc/team/chat/services/chat.service';
import { ProfileService } from '@balnc/core/profile/services/profile.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('chatMessages') private chatMessages: ElementRef
  @ViewChild('chatInput') private chatInput: ElementRef

  // db
  channels: string[] = []
  activeChannel = "default"
  sub: Subscription
  inputs: string[] = []
  user: any
  messages: any
  inputMsg: string
  currentUser: string

  constructor(
    private chatService: ChatService,
    private profileService: ProfileService,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this.currentUser = this.profileService.getCurrent().database.user
    this.load()
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  public async send() {

    if (!this.inputMsg) { return }

    await this.chatService.sendMessage({
      channel: this.activeChannel,
      sender: this.currentUser,
      text: this.inputMsg
    })

    // this.inputMsg.isDisabled = false
    this.inputMsg = null
    this.zone.run(() => {
      this.scrollToBottom()
      this.chatInput.nativeElement.focus()
    })
  }

  private async load() {
    const messages$ = await this.chatService.all$()

    this.sub = messages$.find().$.subscribe(messagesData => {
      if (!messagesData) {
        this.zone.run(() => {
          this.messages = {}
          this.channels = []
        })
      }

      const channels = messagesData
        .map(msg => {
          return msg.channel
        })
        .reduce((_channels, channel) => {
          if (_channels.indexOf(channel) === -1) {
            _channels.push(channel)
          }
          return _channels
        }, [])
        .sort((a, b) => {
          if (a < b) { return -1; }
          if (a > b) { return 1; }
          return 0;
        })

      const messages = messagesData
        .sort((a, b) => {
          if (a.sendAt < b.sendAt) { return -1; }
          if (a.sendAt > b.sendAt) { return 1; }
          return 0;
        })
        .reduce((_groupedMsgs, msg) => {
          if (!_groupedMsgs[msg.channel]) {
            _groupedMsgs[msg.channel] = []
          }
          _groupedMsgs[msg.channel].push(msg)
          return _groupedMsgs
        }, {})

      this.zone.run(() => {
        this.messages = messages
        this.channels = channels
        this.scrollToBottom()
        this.chatInput.nativeElement.focus()
      })
    })
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight
      }, 100)
    } catch (err) {
      console.error(err)
    }
  }
}

class RoomViewModel {
  name: string
  messages: RxChatMessageDoc[]
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

@Pipe({
  name: 'channelFilter',
  pure: false
})
export class ChannelFilterPipe implements PipeTransform {
  transform(items: any[], channel: string): any {
    if (!items || !channel) {
      return items;
    }
    return items.filter(item => item.channel === channel);
  }
}
