import { IssueComponent } from './issue/issue.component';
import { ManageComponent } from './manage/manage.component';
import { OverviewComponent } from './overview/overview.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsResolver } from './_shared/resolver';
import { ShellComponent } from './_shell/shell.component';

export const ProjectsRoutes = [{
  path: '',
  component: ShellComponent,
  resolve: {
    setup: ProjectsResolver
  },
  children: [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: OverviewComponent },
    { path: 'manage', component: ManageComponent },
    { path: 'project/:pid', component: ProjectComponent },
    { path: 'project/:pid/issue/:tid', component: IssueComponent }
  ]
}]
