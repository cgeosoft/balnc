import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { Observable, Subject, Subscription } from 'rxjs'
import { Board } from '../@shared/models/board'
import { Message } from '../@shared/models/message'
import { BoardsRepo } from '../@shared/repos/boards.repo'
import { EmojisService } from './../@shared/services/emojis.service'

const urlRegex = /(https?:\/\/[^\s]+)/g
const giphyApiUrl = 'https://api.giphy.com/v1/gifs'

@Component({
  selector: 'app-boards-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  selected: string

  // messages$: Observable<Message[]>
  messages: Message[]
  filteredMessages$: Subject<Message[]>

  board$: Observable<Board>
  previews: {
    [key: string]: {
      base64?: string,
      file?: any,
      blob?: Blob
    }
  } = {}
  sub: Subscription

  emojiGroupSelect = 0

  giphyResults: any[]
  messagesSubscriber$: Observable<any[]>
  quote: Message
  msgSeperatorDates = {}

  get nickname () {
    return this.configService.user.username
  }

  get emojis () {
    return this.emojisService.emojis
  }

  constructor (
    private configService: ConfigService,
    private boardsRepo: BoardsRepo,
    private route: ActivatedRoute,
    private emojisService: EmojisService
  ) { }

  ngOnInit () {
    this.route.params.subscribe(async (params) => {
      this.selected = params['id']
      if (!this.selected) return
      this.boardsRepo.selected = this.selected
      this.board$ = this.boardsRepo.one$(this.selected)
    })
  }
  async pinBoard () {
    await this.boardsRepo.update(this.selected, {
      pinned: true
    })
  }

  async unpinBoard () {
    await this.boardsRepo.update(this.selected, {
      pinned: false
    })
  }

  async archiveBoard () {
    // todo
  }

  async unarchiveBoard () {
    // todo
  }

  async toggleMark () {
    await this.boardsRepo.mark(this.selected)
  }
}
