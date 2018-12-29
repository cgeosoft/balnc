import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@balnc/common'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { CreateProjectComponent } from './components/create-project/create-project.component'
import { CreateTaskComponent } from './components/create-task/create-task.component'
import { OverviewComponent } from './components/overview/overview.component'
import { ProjectComponent } from './components/project/project.component'
import { TaskComponent } from './components/task/task.component'
import { ProjectsService } from './projects.service'
import { ProjectsRoutes } from './projects.routes'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProjectsRoutes)
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
