import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MarkdownModule } from 'ngx-md'

import { CreateProjectComponent } from '@balnc/team/projects/components/create-project/create-project.component'
import { CreateTaskComponent } from '@balnc/team/projects/components/create-task/create-task.component'
import { MainComponent } from '@balnc/team/projects/components/_main/main.component'
import { OverviewComponent } from '@balnc/team/projects/components/overview/overview.component'
import { ProjectComponent } from '@balnc/team/projects/components/project/project.component'
import { ProjectRoutes } from '@balnc/team/projects/routes/projects.routes'
import { ProjectSchema } from '@balnc/team/projects/data/project'
import { ProjectsComponent } from '@balnc/team/projects/components/projects/projects.component'
import { ProjectsService } from '@balnc/team/projects/services/projects.service'
import { TaskComponent } from '@balnc/team/projects/components/task/task.component'

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
