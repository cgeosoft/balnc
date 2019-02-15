import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '@balnc/shared'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { OverviewComponent } from './components/overview/overview.component'
import { ViewComponent } from './components/view/view.component'
import { OrdersRoutes } from './orders.routes'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(OrdersRoutes)
  ],
  declarations: [
    WrapperComponent,
    OverviewComponent,
    ViewComponent
  ],
  providers: []
})
export class OrdersModule { }
