import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';

import { DatabaseModule } from '../../_core/modules/database/database.module'
import { EllipsisPipe } from '../../../pipes/ellipsis.pipe'

import { ItemComponent, OverviewComponent } from './components'
import { Entity } from '../../_core/modules/database/models/entity';

const entities: Entity[] = [{
  name: 'presentation',
  schema: require('./data/models/presentation.json'),
  sync: true,
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
