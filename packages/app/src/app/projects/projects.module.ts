import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { IssuesRepo } from './@shared/repos/issues.repo'
import { PEventsRepo } from './@shared/repos/pevents.repo'
import { ProjectsRepo } from './@shared/repos/projects.repo'
import { DemoService } from './@shared/services/demo.service'
import { ShellComponent } from './@shell/shell.component'
import { CreateProjectComponent } from './create-project/create-project.component'
import { IssueCreateComponent } from './issue-create/issue-create.component'
import { IssueComponent } from './issue/issue.component'
import { OverviewComponent } from './overview/overview.component'
import { ProjectManageComponent } from './project-manage/project-manage.component'
import { FilterIssuesPipe, ProjectComponent } from './project/project.component'
import { ProjectsRoutes } from './projects.routes'
import { SettingsComponent } from './settings/settings.component'
import { IssuesComponent } from './issues/issues.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ProjectsRoutes)
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
    IssuesComponent
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
