import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common'

import { BoardService } from './services/board.service'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { BoardComponent, FilterBoardPipe } from './components/board/board.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    WrapperComponent,
    BoardComponent,

    FilterBoardPipe
  ],
  providers: [
    BoardService
  ]
})
export class BoardsModule { }
