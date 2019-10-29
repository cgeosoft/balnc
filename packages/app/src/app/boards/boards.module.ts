import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { BoardComponent } from './board/board.component'
import { BoardsRoutes } from './boards.routes'
import { BoardsService } from './_shared/boards.service'
import { MessagesService } from './_shared/messages.service'
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
    BoardsService,
    MessagesService,
  ]
})
export class BoardsModule { }
