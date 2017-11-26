import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { EllipsisPipe } from '../../../pipes/ellipsis.pipe';

import { ItemComponent, OverviewComponent } from './components'
import { Database } from './data/db.service'

const appRoutes: Routes = [
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
    RouterModule.forChild(appRoutes)
  ],
  providers: [
    Database
  ]
})
export class PresentationsModule { }
