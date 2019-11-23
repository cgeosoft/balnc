import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { LocalStorage } from 'ngx-store'
import { BoardStats } from '../models/board-stats'
import { Message } from '../models/message'

@Injectable()
export class MessagesRepo extends Repository<Message> {

  @LocalStorage() nickname: string = ''
  @LocalStorage() boardsStats: BoardStats[] = []

  selectedBoard: string

  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'boards.message'
  }
}
