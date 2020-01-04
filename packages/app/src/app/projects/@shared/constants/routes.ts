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
    breadcrumb: {
      label: 'Projects'
    }
  },
  children: [
    {
      path: 'overview',
      component: OverviewComponent,
      data: {
        breadcrumb: {
          label: 'Overview'
        }
      }
    },
    {
      path: 'settings',
      component: SettingsComponent,
      data: {
        breadcrumb: {
          label: 'Settings'
        }
      }
    },
    {
      path: 'projects',
      data: {
        breadcrumb: {
          label: 'Projects'
        }
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
            breadcrumb: {
              label: 'Project#'
            }
          },
          children: [
            {
              path: 'manage',
              component: ProjectManageComponent,
              data: {
                breadcrumb: {
                  label: 'Manage'
                }
              }
            },
            {
              path: 'issues',
              component: IssuesComponent,
              data: {
                breadcrumb: {
                  label: 'Issues'
                }
              }
            },
            {
              path: 'issues/:iid',
              component: IssueComponent,
              data: {
                breadcrumb: {
                  label: 'Issue#'
                }
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
