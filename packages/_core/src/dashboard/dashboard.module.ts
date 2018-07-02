import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common'
import { DashboardComponent } from './dashboard.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: []
})
export class DashboardModule { }
