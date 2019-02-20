import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '@balnc/shared'

import { OverviewComponent } from './overview/overview.component'
import { ViewComponent } from './view/view.component'
import { OrdersRoutes } from './orders.routes'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(OrdersRoutes)
  ],
  declarations: [
    OverviewComponent,
    ViewComponent
  ],
  providers: []
})
export class OrdersModule { }
