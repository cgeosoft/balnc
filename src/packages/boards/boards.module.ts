import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CommonModule } from '@balnc/common'

import { BoardsService } from './boards.service'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { BoardComponent } from './components/board/board.component'
import { BoardsEntities } from './models/_entities'
import { BoardsRoutes } from '.';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BoardsRoutes)
  ],
  declarations: [
    WrapperComponent,
    BoardComponent
  ],
  providers: [
    BoardsService
  ]
})
export class BoardsModule { }
