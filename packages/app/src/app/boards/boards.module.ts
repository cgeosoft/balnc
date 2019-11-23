import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { BoardComponent } from './board/board.component'
import { BoardsRoutes } from './boards.routes'
import { SettingsComponent } from './settings/settings.component'
import { BoardsRepo } from './_shared/repos/boards.repo'
import { MessagesRepo } from './_shared/repos/messages.repo'
import { DemoService } from './_shared/services/demo.service'
import { ShellComponent } from './_shell/shell.component'

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
