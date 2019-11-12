import { BoardComponent } from './board/board.component'
import { ShellComponent } from './_shell/shell.component'

export const BoardsRoutes = [{
  path: '',
  component: ShellComponent,
  children: [
    { path: '', component: BoardComponent },
    { path: ':id', component: BoardComponent }
  ]
}]
