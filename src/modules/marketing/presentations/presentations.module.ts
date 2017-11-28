import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { DatabaseModule } from '../../main/database/database.module'
import { EllipsisPipe } from '../../../pipes/ellipsis.pipe';

import { ItemComponent, OverviewComponent } from './components'

const schemas: any = [{
  name: 'presentation',
  schema: require('./data/models/presentation.json'),
  sync: true,
}]

const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: '', redirectTo: "overview" },
]

@NgModule({
  declarations: [
    OverviewComponent,
    ItemComponent,
    EllipsisPipe
  ],
  imports: [
    CommonModule,
    DatabaseModule.forChild(schemas),
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class PresentationsModule { }
