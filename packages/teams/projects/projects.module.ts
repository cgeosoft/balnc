import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { NgxMdModule  } from 'ngx-md'

import { CommonModule } from '@balnc/common/common.module';

import { MainComponent } from '@balnc/teams/projects/components/_main/_main.component'
import { CreateProjectComponent } from '@balnc/teams/projects/components/create-project/create-project.component'
import { CreateTaskComponent } from '@balnc/teams/projects/components/create-task/create-task.component'
import { OverviewComponent } from '@balnc/teams/projects/components/overview/overview.component'
import { ProjectComponent } from '@balnc/teams/projects/components/project/project.component'
import { ProjectSchema } from '@balnc/teams/projects/data/project'
import { ProjectsComponent } from '@balnc/teams/projects/components/projects/projects.component'
import { ProjectsService } from '@balnc/teams/projects/services/projects.service'
import { TaskComponent } from '@balnc/teams/projects/components/task/task.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: 'projects',
      component: MainComponent,
      resolve: {
        db: ProjectsService,
      },
      children: [
        { path: 'overview', component: OverviewComponent },
        { path: 'manage', component: ProjectsComponent },
        { path: ':id', component: ProjectComponent },
        { path: 'tasks/:id', component: TaskComponent },
        { path: '', redirectTo: "overview" },
      ],
    }]),
    NgxMdModule ,
  ],
  declarations: [
    MainComponent,
    OverviewComponent,
    ProjectsComponent,
    ProjectComponent,
    TaskComponent,
    CreateTaskComponent,
    CreateProjectComponent,
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
