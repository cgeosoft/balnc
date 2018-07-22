import { Routes } from '@angular/router'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { OverviewComponent } from './components/overview/overview.component'
import { ProjectsComponent } from './components/projects/projects.component'
import { ProjectComponent } from './components/project/project.component'
import { TaskComponent } from './components/task/task.component'

export const ProjectsRoutes: Routes = [{
  path: 'projects',
  component: WrapperComponent,
  children: [
        { path: 'overview', component: OverviewComponent },
        { path: 'manage', component: ProjectsComponent },
        { path: ':id', component: ProjectComponent },
        { path: 'tasks/:id', component: TaskComponent },
        { path: '', pathMatch: 'full', redirectTo: 'overview' }
  ]
}]
