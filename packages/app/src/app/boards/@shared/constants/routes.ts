import { ShellComponent } from '../../@shell/shell.component'
import { BoardComponent } from '../../board/board.component'
import { BoardsComponent } from '../../boards/boards.component'
import { SettingsComponent } from '../../settings/settings.component'

export const BOARDS_ROUTES = [{
  path: '',
  component: ShellComponent,
  children: [
    {
      path: 'manage',
      component: BoardsComponent
    },
    {
      path: 'settings',
      component: SettingsComponent
    },
    {
      path: ':id',
      component: BoardComponent
    },
    { path: '', redirectTo: 'manage', pathMatch: 'full' }
  ]
}]
