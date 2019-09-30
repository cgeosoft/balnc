import { BoardComponent } from './board/board.component'
import { BoardsResolver } from './_shared/resolver'
import { ShellComponent } from './_shell/shell.component'

export const BoardsRoutes = [{
  path: '',
  component: ShellComponent,
  resolve: {
    setup: BoardsResolver
  },
  children: [
    { path: '', component: BoardComponent },
    { path: ':id', component: BoardComponent }
  ]
}]
