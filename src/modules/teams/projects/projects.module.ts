import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule, Routes } from '@angular/router'

import { MarkdownModule } from 'ngx-md';

import { CommonModule } from '../../_core/common/common.module';
import { Entity } from '../../_core/database/models/entity';

import {
  ProjectsComponent,
  ProjectComponent,
  TaskComponent,
  CreateTaskComponent,
  CreateProjectComponent
} from './components'

import { ProjectSchema } from './data/project';
import { TaskSchema } from './data/task';
import { DatabaseModule } from '../../_core/database/database.module';
import { OverviewComponent } from './components/overview/overview.component';
import { MainComponent } from './components/_main/main.component';
import { ProjectsService } from './services/projects.service';


const entities: Entity[] = [{
  name: 'project',
  schema: ProjectSchema,
  sync: false,
}, {
  name: 'task',
  schema: TaskSchema,
  sync: false,
}]

const routes: Routes = [{
  path: '',
  component: MainComponent,
  resolve: {
    service: ProjectsService
  },
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'manage', component: ProjectsComponent },
    { path: ':id', component: ProjectComponent },
    { path: 'tasks/:id', component: TaskComponent },
    { path: '', redirectTo: "overview" },
  ],
}]

@NgModule({
  declarations: [
    MainComponent,
    OverviewComponent,
    ProjectsComponent,
    ProjectComponent,
    TaskComponent,
    CreateTaskComponent,
    CreateProjectComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,

    DatabaseModule.forChild(entities),
    RouterModule.forChild(routes),
    MarkdownModule,
  ],
  providers: [
    ProjectsService
  ],
  entryComponents: [
    CreateTaskComponent,
    CreateProjectComponent,
  ]
})
export class ProjectsModule { }
