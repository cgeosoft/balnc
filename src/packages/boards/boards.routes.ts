import { Routes } from '@angular/router'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { BoardComponent } from './components/board/board.component'

export const BoardsRoutes: Routes = [{
  path: 'boards',
  component: WrapperComponent,
  children: [
    { path: ':board', component: BoardComponent }
  ]
}]
