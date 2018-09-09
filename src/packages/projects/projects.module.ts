import { NgModule, APP_INITIALIZER } from '@angular/core'
import { RouterModule } from '@angular/router'

import { NgxMdModule } from 'ngx-md'

import { CommonModule, PouchDBService } from '@balnc/common'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { OverviewComponent } from './components/overview/overview.component'
import { CreateProjectComponent } from './components/create-project/create-project.component'
import { CreateTaskComponent } from './components/create-task/create-task.component'
import { ProjectComponent } from './components/project/project.component'
import { ProjectsService } from './services/projects.service'
import { TaskComponent } from './components/task/task.component'
import { ProjectsEntities } from './models/_entities'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxMdModule
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
    ProjectsService,
    PouchDBService,
    {
      provide: APP_INITIALIZER,
      deps: [PouchDBService],
      multi: true,
      useFactory: (db: PouchDBService) => async () => {
        await db.setup('projects', [
          ...ProjectsEntities
        ]).catch(err => {
          sessionStorage.setItem('ngx_error', err.stack)
          if (window.location.href.indexOf('/error') === -1) {
            window.location.href = '/error'
          }
        })
      }
    }
  ],
  entryComponents: [
    CreateTaskComponent,
    CreateProjectComponent
  ]
})
export class ProjectsModule { }
