import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { DashboardComponent } from './dashboard.component'
import { DASHBOARD_ROUTES } from './dashboard.routes'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(DASHBOARD_ROUTES)
  ],
  declarations: [
    DashboardComponent
  ],
  providers: []
})
export class DashboardModule { }
