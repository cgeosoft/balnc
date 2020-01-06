import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { BOARDS_ROUTES } from './@shared/constants/routes'
import { BoardsRepo } from './@shared/repos/boards.repo'
import { MessagesRepo } from './@shared/repos/messages.repo'
import { DemoService } from './@shared/services/demo.service'
import { ShellComponent } from './@shell/shell.component'
import { BoardComponent } from './board/board.component'
import { BoardsComponent } from './boards/boards.component'
import { SettingsComponent } from './settings/settings.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(BOARDS_ROUTES)
  ],
  declarations: [
    ShellComponent,
    BoardComponent,
    SettingsComponent,
    BoardsComponent
  ],
  providers: [
    BoardsRepo,
    MessagesRepo,
    DemoService
  ]
})
export class BoardsModule { }
