import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common/common.module';
import { ProjectsModule } from './projects/projects.module'
import { ChatModule } from './chat/chat.module'

@NgModule({
  imports: [
    CommonModule,
    ChatModule,
    ProjectsModule,
  ],
  declarations: [],
  providers: [],
})
export class TeamModule { }
