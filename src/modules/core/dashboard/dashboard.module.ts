import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common/common.module';
import { DashboardComponent } from './dashboard.component'

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: []
})
export class DashboardModule { }
