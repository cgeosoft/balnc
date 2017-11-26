import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ItemComponent, OverviewComponent } from './components'
import { Database } from './data/db.service'

const appRoutes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: '', redirectTo: "overview" },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    OverviewComponent,
    ItemComponent,
  ],
  providers: [
    Database
  ]
})
export class PresentationsModule { }
