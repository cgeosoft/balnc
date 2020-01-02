import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { OrderCreateComponent } from './order-create/order-create.component'
import { OrdersComponent } from './orders/orders.component'

@NgModule({
  declarations: [
    OrdersComponent,
    OrderCreateComponent
  ],
  entryComponents: [
    OrderCreateComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: OrdersComponent }
    ])
  ]
})
export class OrdersModule { }
