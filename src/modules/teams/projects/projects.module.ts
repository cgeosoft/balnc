import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule, Routes } from '@angular/router'

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
  children: [
    { path: 'overview', component: ProjectsComponent },
    { path: ':projectId', component: ProjectComponent },
    { path: ':projectId/:taskId', component: TaskComponent },
    { path: '', redirectTo: "overview" },
  ],
}]

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectComponent,
    TaskComponent,
    CreateTaskComponent,
    CreateProjectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DatabaseModule.forChild(entities),
    RouterModule.forChild(routes)
  ],
  providers: [],
  entryComponents: [
    CreateTaskComponent,
    CreateProjectComponent,
  ]
})
export class ProjectsModule { }
