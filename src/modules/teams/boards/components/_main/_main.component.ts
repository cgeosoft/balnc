import { Component, NgZone, OnInit, ElementRef, ViewChild, Pipe, PipeTransform } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import { RxCollection } from 'rxdb'

import * as _ from 'lodash'
import * as moment from 'moment'

import { RxMessageDoc, Message } from '@balnc/teams/boards/models/message'
import { BoardService } from '@balnc/teams/boards/services/board.service';
import { ProfileService } from '@balnc/core/profile/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams-boards-main',
  templateUrl: './_main.component.html',
  styleUrls: ['./_main.component.scss']
})
export class MainComponent implements OnInit {

  boards: any[] = []
  nickname: string
  newBoard: string

  constructor(
    private boardService: BoardService,
    private profileService: ProfileService,
    private zone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
    this.nickname = this.boardService.nickname
    this.load()
  }
  private async load() {
    this.boards = this.boardService.boards
  }

  async addBoard() {
    if (!this.newBoard) { return }
    await this.boardService.send({
      board: this.newBoard,
      sender: this.nickname,
      type: "CMD-CREATE",
      data: {
        user: this.nickname
      },
    })
    this.router.navigate(["/teams/boards", this.newBoard])
    this.newBoard = null
    this.load()
  }
}
