import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MarkdownModule } from 'ngx-md'

import { CommonModule } from '@blnc/core/common/common.module'
import { CreateProjectComponent } from '@blnc/teams/projects/components/create-project/create-project.component'
import { CreateTaskComponent } from '@blnc/teams/projects/components/create-task/create-task.component'
import { MainComponent } from '@blnc/teams/projects/components/_main/main.component'
import { OverviewComponent } from '@blnc/teams/projects/components/overview/overview.component'
import { ProjectComponent } from '@blnc/teams/projects/components/project/project.component'
import { ProjectRoutes } from '@blnc/teams/projects/routes/projects.routes'
import { ProjectSchema } from '@blnc/teams/projects/data/project'
import { ProjectsComponent } from '@blnc/teams/projects/components/projects/projects.component'
import { ProjectsService } from '@blnc/teams/projects/services/projects.service'
import { TaskComponent } from '@blnc/teams/projects/components/task/task.component'

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
    RouterModule.forChild(ProjectRoutes),
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
