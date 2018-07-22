import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common';

import { MainComponent } from '@balnc/teams/boards/components/_main/_main.component'
import { BoardComponent } from '@balnc/teams/boards/components/board/board.component'
import { BoardService } from '@balnc/teams/boards/services/board.service'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: 'boards',
      component: MainComponent,
      resolve: {
        db: BoardService,
      },
      children: [
        { path: ':board', component: BoardComponent }
      ],
    }]),
  ],
  declarations: [
    MainComponent,
BoardComponent,
  ],
  providers: [
    BoardService,
  ]
})
export class BoardsModule { }
