import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '../../_core/common/common.module';

import {ProjectsComponent} from './components'

import { TodoSchema } from './data/message';

const entities: Entity[] = [{
  name: 'todo',
  schema: TodoSchema,
  sync: false,
}]

const routes: Routes = [{
  path: '',
  children: [
    { path: 'overview', component: ProjectsComponent },
    { path: 'project/:id/todo', component: ProjectsComponent },
    { path: '', redirectTo: "overview" },
  ]}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    DatabaseModule.forChild(entities),
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProjectsComponent
  ],
  providers: []
})
export class ProjectsModule { }
