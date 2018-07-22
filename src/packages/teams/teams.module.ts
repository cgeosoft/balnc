import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common';

import { ProjectsModule } from '@balnc/teams/projects/projects.module'
import { BoardsModule } from '@balnc/teams/boards/boards.module'

@NgModule({
  imports: [
    CommonModule,
    BoardsModule,
    ProjectsModule,
  ],
  declarations: [],
  providers: [],
})
export class TeamsModule { }
