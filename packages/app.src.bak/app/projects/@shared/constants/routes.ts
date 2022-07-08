import { ShellComponent } from '../../@shell/shell.component'
import { OverviewComponent } from '../../overview/overview.component'
import { IssueComponent } from '../../project/issue/issue.component'
import { IssuesComponent } from '../../project/issues/issues.component'
import { ProjectManageComponent } from '../../project/manage/manage.component'
import { ProjectComponent } from '../../project/project.component'
import { ProjectsComponent } from '../../projects/projects.component'
import { SettingsComponent } from '../../settings/settings.component'

export const PROJECTS_ROUTES = [{
  path: '',
  component: ShellComponent,
  data: {
    title: 'Projects'
  },
  children: [
    {
      path: 'overview',
      component: OverviewComponent,
      data: {
        title: 'Overview'
      }
    },
    {
      path: 'settings',
      component: SettingsComponent,
      data: {
        title: 'Settings'
      }
    },
    {
      path: 'projects',
      data: {
        title: 'Projects'
      },
      children: [
        {
          path: '',
          component: ProjectsComponent
        },
        {
          path: ':pid',
          component: ProjectComponent,
          data: {
            title: 'Project#'
          },
          children: [
            {
              path: 'manage',
              component: ProjectManageComponent,
              data: {
                title: 'Manage'
              }
            },
            {
              path: 'issues',
              component: IssuesComponent,
              data: {
                title: 'Issues'
              }
            },
            {
              path: 'issues/:iid',
              component: IssueComponent,
              data: {
                title: 'Issue#'
              }
            },
            { path: '', redirectTo: 'issues', pathMatch: 'full' }
          ]
        }
      ]
    },
    { path: '', redirectTo: 'overview', pathMatch: 'full' }
  ]
}]
