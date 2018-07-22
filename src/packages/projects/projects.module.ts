import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { NgxMdModule } from 'ngx-md'

import { CommonModule } from '@balnc/common'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { CreateProjectComponent } from './components/create-project/create-project.component'
import { CreateTaskComponent } from './components/create-task/create-task.component'
import { OverviewComponent } from './components/overview/overview.component'
import { ProjectComponent } from './components/project/project.component'
import { ProjectsComponent } from './components/projects/projects.component'
import { ProjectsService } from './services/projects.service'
import { TaskComponent } from './components/task/task.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxMdModule
  ],
  declarations: [
    WrapperComponent,
    OverviewComponent,
    ProjectsComponent,
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
