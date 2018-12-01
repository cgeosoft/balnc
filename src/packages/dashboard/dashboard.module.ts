import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common'

import { DashboardComponent } from './dashboard.component'
import { DashboardRoutes } from './dashboard.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [
    DashboardComponent
  ],
  providers: []
})
export class DashboardModule { }
