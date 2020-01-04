import { ShellComponent } from './@shell/shell.component'
import { IssueComponent } from './issue/issue.component'
import { IssuesComponent } from './issues/issues.component'
import { OverviewComponent } from './overview/overview.component'
import { ProjectManageComponent } from './project-manage/project-manage.component'
import { ProjectComponent } from './project/project.component'
import { SettingsComponent } from './settings/settings.component'

export const ProjectsRoutes = [{
  path: '',
  component: ShellComponent,
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'settings', component: SettingsComponent },
    {
      path: ':pid',
      component: ProjectComponent,
      children: [
        { path: 'manage', component: ProjectManageComponent },
        { path: 'issues', component: IssuesComponent },
        { path: 'issues/:iid', component: IssueComponent }
      ]
    },
    { path: '', redirectTo: 'overview', pathMatch: 'full' }
  ]
}]
