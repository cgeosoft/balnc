import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@balnc/common'
import { MarkdownModule, MarkedOptions } from 'ngx-markdown'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { CreateProjectComponent } from './components/create-project/create-project.component'
import { CreateTaskComponent } from './components/create-task/create-task.component'
import { OverviewComponent } from './components/overview/overview.component'
import { ProjectComponent } from './components/project/project.component'
import { TaskComponent } from './components/task/task.component'
import { ProjectsRoutes } from './projects.routes'
import { ProjectsService } from './projects.service'

@NgModule({
  imports: [
    CommonModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: true,
          sanitize: true,
          smartLists: true,
          smartypants: true
        }
      }
    }),
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
