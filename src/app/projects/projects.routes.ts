import { OverviewComponent } from './overview/overview.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { ShellComponent } from './_shell/shell.component';

export const ProjectsRoutes = [{
  path: '',
  component: ShellComponent,
  children: [
    { path: '', component: OverviewComponent },
    { path: 'project/:pid', component: ProjectComponent },
    { path: 'project/:pid/task/:tid', component: TaskComponent }
  ]
}]
