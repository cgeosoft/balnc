import { Routes } from '@angular/router'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { ProjectComponent } from './components/project/project.component'
import { TaskComponent } from './components/task/task.component'

export const ProjectsRoutes: Routes = [{
  path: 'projects',
  component: WrapperComponent,
  children: [
        { path: ':projectId', component: ProjectComponent },
        { path: ':projectId/tasks/:taskId', component: TaskComponent },
        { path: '', pathMatch: 'full', redirectTo: 'overview' }
  ]
}]
