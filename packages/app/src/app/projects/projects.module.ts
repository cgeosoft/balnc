import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { CreateProjectComponent } from './create-project/create-project.component'
import { IssueCreateComponent } from './issue-create/issue-create.component'
import { IssueComponent } from './issue/issue.component'
import { OverviewComponent } from './overview/overview.component'
import { ProjectManageComponent } from './project-manage/project-manage.component'
import { FilterIssuesPipe, ProjectComponent } from './project/project.component'
import { ProjectsRoutes } from './projects.routes'
import { SettingsComponent } from './settings/settings.component'
import { IssuesRepo } from './_shared/repos/issues.repo'
import { PEventsRepo } from './_shared/repos/pevents.repo'
import { ProjectsRepo } from './_shared/repos/projects.repo'
import { DemoService } from './_shared/services/demo.service'
import { ShellComponent } from './_shell/shell.component'

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
    ProjectManageComponent
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
