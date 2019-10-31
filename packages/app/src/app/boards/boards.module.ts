import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { BoardComponent } from './board/board.component'
import { BoardsRoutes } from './boards.routes'
import { BoardsRepo } from './_shared/repos/boards.repo'
import { MessagesRepo } from './_shared/repos/messages.repo'
import { ShellComponent } from './_shell/shell.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(BoardsRoutes)
  ],
  declarations: [
    ShellComponent,
    BoardComponent
  ],
  providers: [
    BoardsRepo,
    MessagesRepo
  ]
})
export class BoardsModule { }
