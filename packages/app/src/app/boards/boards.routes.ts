import { BoardComponent } from './board/board.component'
import { SettingsComponent } from './settings/settings.component'
import { ShellComponent } from './_shell/shell.component'

export const BoardsRoutes = [{
  path: '',
  component: ShellComponent,
  children: [
    { path: '', component: BoardComponent },
    { path: 'settings', component: SettingsComponent },
    { path: ':id', component: BoardComponent }
  ]
}]
