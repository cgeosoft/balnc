import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { BoardComponent } from './components/board/board.component'
import { BoardsService } from './boards.service'

export const BoardsRoutes = [{
  path: 'boards',
  resolve: {
    srv: BoardsService
  },
  component: WrapperComponent,
  children: [
    { path: ':board', component: BoardComponent }
  ]
}]
