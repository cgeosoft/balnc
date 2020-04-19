import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { OrdersRepo } from './@shared/orders.repo'
import { ShellComponent } from './@shell/shell.component'
import { OrderCreateComponent } from './order-create/order-create.component'
import { OrderComponent } from './order/order.component'
import { OrdersComponent } from './orders/orders.component'

@NgModule({
  declarations: [
    OrdersComponent,
    OrderComponent,
    OrderCreateComponent,
    ShellComponent
  ],
  entryComponents: [
    OrderCreateComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ShellComponent }
    ])
  ],
  providers: [
    OrdersRepo
  ]
})
export class OrdersModule { }
