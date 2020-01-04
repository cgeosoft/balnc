import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { PROJECTS_ROUTES } from './@shared/constants/routes'
import { FilterIssuesPipe } from './@shared/pipes/FilterIssuesPipe'
import { IssuesRepo } from './@shared/repos/issues.repo'
import { PEventsRepo } from './@shared/repos/pevents.repo'
import { ProjectsRepo } from './@shared/repos/projects.repo'
import { DemoService } from './@shared/services/demo.service'
import { ShellComponent } from './@shell/shell.component'
import { CreateProjectComponent } from './create-project/create-project.component'
import { OverviewComponent } from './overview/overview.component'
import { IssueCreateComponent } from './project/issue-create/issue-create.component'
import { IssueComponent } from './project/issue/issue.component'
import { IssuesComponent } from './project/issues/issues.component'
import { ProjectManageComponent } from './project/manage/manage.component'
import { ProjectComponent } from './project/project.component'
import { ProjectsComponent } from './projects/projects.component'
import { SettingsComponent } from './settings/settings.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(PROJECTS_ROUTES)
  ],
  declarations: [
    FilterIssuesPipe,

    ShellComponent,
    OverviewComponent,
    ProjectComponent,
    IssueComponent,
    IssueCreateComponent,
    CreateProjectComponent,
    SettingsComponent,
    ProjectManageComponent,
    IssuesComponent,
    ProjectsComponent
  ],
  providers: [
    PEventsRepo,
    IssuesRepo,
    ProjectsRepo,
    DemoService
  ],
  entryComponents: [
    IssueCreateComponent,
    CreateProjectComponent,
    ProjectManageComponent
  ]
})
export class ProjectsModule { }
