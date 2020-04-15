import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { BOARDS_ROUTES } from './@shared/constants/routes'
import { EmojisService } from './@shared/services/emojis.service'
import { ShellComponent } from './@shell/shell.component'
import { BoardComponent } from './board/board.component'
import { FilesComponent } from './board/files/files.component'
import { ManageComponent } from './board/manage/manage.component'
import { MessageComponent } from './board/timeline/message/message.component'
import { TimelineComponent } from './board/timeline/timeline.component'
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
    BoardsComponent,
    TimelineComponent,
    MessageComponent,
    ManageComponent,
    FilesComponent
  ],
  providers: [
    EmojisService
  ]
})
export class BoardsModule { }
