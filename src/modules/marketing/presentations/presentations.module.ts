import { TaskRunner } from 'protractor/built/taskRunner';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';

import { DatabaseModule } from '../../_core/modules/database/database.module'
import { EllipsisPipe } from '../../../pipes/ellipsis.pipe'

import { ItemComponent, OverviewComponent } from './components'
import { BehaviorSubject } from 'RxJS/BehaviorSubject';
import { Entity } from '../../_core/modules/database/models/entity';

const entities = [{
  name: 'presentation',
  schema: require('./data/models/presentation.json'),
  sync: true,
  ready: new BehaviorSubject<boolean>(false),
}]

const routes: Routes = [{
  path: '',
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'item/:id', component: ItemComponent },
    { path: '', redirectTo: "overview" },
  ]
}]

@NgModule({
  declarations: [
    OverviewComponent,
    ItemComponent,
    EllipsisPipe
  ],
  imports: [
    CommonModule,
    DatabaseModule.forChild(entities),
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class PresentationsModule { }
