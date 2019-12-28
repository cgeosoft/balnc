import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { BoardsRepo } from './@shared/repos/boards.repo'
import { MessagesRepo } from './@shared/repos/messages.repo'
import { DemoService } from './@shared/services/demo.service'
import { ShellComponent } from './@shell/shell.component'
import { BoardComponent } from './board/board.component'
import { BoardsRoutes } from './boards.routes'
import { SettingsComponent } from './settings/settings.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(BoardsRoutes)
  ],
  declarations: [
    ShellComponent,
    BoardComponent,
    SettingsComponent
  ],
  providers: [
    BoardsRepo,
    MessagesRepo,
    DemoService
  ]
})
export class BoardsModule { }
