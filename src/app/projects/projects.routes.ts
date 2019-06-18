import { OverviewComponent } from './overview/overview.component';
import { ProjectComponent } from './project/project.component';
import { IssueComponent } from './task/task.component';
import { ProjectsResolver } from './_shared/resolver';
import { ShellComponent } from './_shell/shell.component';

export const ProjectsRoutes = [{
  path: '',
  component: ShellComponent,
  resolve: {
    setup: ProjectsResolver
  },
  children: [
    { path: '', component: OverviewComponent },
    { path: 'project/:pid', component: ProjectComponent },
    { path: 'project/:pid/issue/:tid', component: IssueComponent }
  ]
}]
