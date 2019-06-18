import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { OverviewComponent } from './overview/overview.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsRoutes } from './projects.routes';
import { IssueComponent } from './task/task.component';
import { ProjectsService } from './_shared/projects.service';
import { ProjectsResolver } from './_shared/resolver';
import { ShellComponent } from './_shell/shell.component';

@NgModule({
  imports: [
    SharedModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: true,
          sanitize: true,
          smartLists: true,
          smartypants: true
        }
      }
    }),
    RouterModule.forChild(ProjectsRoutes)
  ],
  declarations: [
    ShellComponent,
    OverviewComponent,
    ProjectComponent,
    IssueComponent,
    CreateTaskComponent,
    CreateProjectComponent
  ],
  providers: [
    ProjectsResolver,
    ProjectsService
  ],
  entryComponents: [
    CreateTaskComponent,
    CreateProjectComponent
  ]
})
export class ProjectsModule { }
