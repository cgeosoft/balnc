import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { BlcCommonModule } from "../../_core/common/common.module"
import { DashboardComponent } from './dashboard.component'

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    BlcCommonModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: []
})
export class DashboardModule { }
