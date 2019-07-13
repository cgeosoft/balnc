import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';
import { BoardComponent } from './board/board.component';
import { BoardsRoutes } from './boards.routes';
import { BoardsService } from './_shared/boards.service';
import { BoardsResolver } from './_shared/resolver';
import { ShellComponent } from './_shell/shell.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(BoardsRoutes)
  ],
  declarations: [
    ShellComponent,
    BoardComponent
  ],
  providers: [
    BoardsService,
    BoardsResolver,
  ]
})
export class BoardsModule { }
