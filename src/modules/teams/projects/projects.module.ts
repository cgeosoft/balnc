import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MarkdownModule } from 'ngx-md'

import { CommonModule } from '@blnc/core/common/common.module'
import { Entity } from '@blnc/core/database/models/entity'
import { DatabaseModule } from '@blnc/core/database/database.module'

import {
  ProjectsComponent,
  ProjectComponent,
  TaskComponent,
  CreateTaskComponent,
  CreateProjectComponent
} from './components'

import { ProjectSchema } from './data/project'
import { TaskSchema } from './data/task'
import { OverviewComponent } from './components/overview/overview.component'
import { MainComponent } from './components/_main/main.component'
import { ProjectsService } from './services/projects.service'

const routes: Routes = [{
  path: '',
  resolve: {
    service: ProjectsService
  },
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'manage', component: ProjectsComponent },
    { path: ':id', component: ProjectComponent },
    { path: 'tasks/:id', component: TaskComponent },
    { path: '', redirectTo: "overview" },
  ],
}]

@NgModule({
  declarations: [
    MainComponent,
    OverviewComponent,
    ProjectsComponent,
    ProjectComponent,
    TaskComponent,
    CreateTaskComponent,
    CreateProjectComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MarkdownModule,
  ],
  providers: [
    ProjectsService
  ],
  entryComponents: [
    CreateTaskComponent,
    CreateProjectComponent,
  ]
})
export class ProjectsModule { }
