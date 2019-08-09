import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';
import { MarkdownModule } from 'ngx-markdown';
import { CreateProjectComponent } from './create-project/create-project.component';
import { IssueCreateComponent } from './issue-create/issue-create.component';
import { IssueComponent } from './issue/issue.component';
import { OverviewComponent } from './overview/overview.component';
import { ProjectManageComponent } from './project-manage/project-manage.component';
import { FilterIssuesPipe, ProjectComponent } from './project/project.component';
import { ProjectsRoutes } from './projects.routes';
import { SettingsComponent } from './settings/settings.component';
import { ProjectsService } from './_shared/projects.service';
import { ProjectsResolver } from './_shared/resolver';
import { ShellComponent } from './_shell/shell.component';

@NgModule({
  imports: [
    SharedModule,
    MarkdownModule,
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
  ],
  providers: [
    ProjectsResolver,
    ProjectsService
  ],
  entryComponents: [
    IssueCreateComponent,
    CreateProjectComponent,
    ProjectManageComponent
  ]
})
export class ProjectsModule { }
