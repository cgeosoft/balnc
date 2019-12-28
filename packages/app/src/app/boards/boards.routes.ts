import { ShellComponent } from './@shell/shell.component'
import { BoardComponent } from './board/board.component'
import { SettingsComponent } from './settings/settings.component'

export const BoardsRoutes = [{
  path: '',
  component: ShellComponent,
  children: [
    { path: '', component: BoardComponent },
    { path: 'settings', component: SettingsComponent },
    { path: ':id', component: BoardComponent }
  ]
}]
