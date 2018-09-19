import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { NgxMdModule } from 'ngx-md'

import { CommonModule } from '@balnc/common'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { OverviewComponent } from './components/overview/overview.component'
import { CreateProjectComponent } from './components/create-project/create-project.component'
import { CreateTaskComponent } from './components/create-task/create-task.component'
import { ProjectComponent } from './components/project/project.component'
import { ProjectsService } from './services/projects.service'
import { TaskComponent } from './components/task/task.component'
import { ProjectsEntities } from './models/_entities'
import { RxDBModule } from '@balnc/core'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxMdModule,
    RxDBModule
  ],
  declarations: [
    WrapperComponent,
    OverviewComponent,
    ProjectComponent,
    TaskComponent,
    CreateTaskComponent,
    CreateProjectComponent
  ],
  providers: [
    ProjectsService
  ],
  entryComponents: [
    CreateTaskComponent,
    CreateProjectComponent
  ]
})
export class ProjectsModule { }
