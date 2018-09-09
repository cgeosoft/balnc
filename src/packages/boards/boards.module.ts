import { NgModule, APP_INITIALIZER } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CommonModule, PouchDBService } from '@balnc/common'

import { BoardService } from './board.service'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { BoardComponent } from './components/board/board.component'
import { BoardsEntities } from './models/_entities'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    WrapperComponent,
    BoardComponent
  ],
  providers: [
    BoardService,
    PouchDBService,
    {
      provide: APP_INITIALIZER,
      deps: [PouchDBService],
      multi: true,
      useFactory: (db: PouchDBService) => async () => {
        await db.setup('boards', [
          ...BoardsEntities
        ]).catch(err => {
          sessionStorage.setItem('ngx_error', err.stack)
          if (window.location.href.indexOf('/error') === -1) {
            window.location.href = '/error'
          }
        })
      }
    }
  ]
})
export class BoardsModule { }
