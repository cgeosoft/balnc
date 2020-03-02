import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { BOARDS_ROUTES } from './@shared/constants/routes'
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
  ]
})
export class BoardsModule { }
