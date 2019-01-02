import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { OverviewComponent } from './components/overview/overview.component'
import { ProjectComponent } from './components/project/project.component'
import { TaskComponent } from './components/task/task.component'
import { ProjectsService } from './projects.service'

export const ProjectsRoutes = [{
  path: '',
  component: WrapperComponent,
  resolve: {
    srv: ProjectsService
  },
  children: [
    { path: '', component: OverviewComponent },
    { path: ':projectId', component: ProjectComponent },
    { path: ':projectId/:taskId', component: TaskComponent }
  ]
}]
