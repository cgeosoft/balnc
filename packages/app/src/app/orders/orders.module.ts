import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';
import { OrdersRepo } from './@shared/orders.repo';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderComponent,
    OrderCreateComponent
  ],
  entryComponents: [
    OrderCreateComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: OrdersComponent },
      { path: ':id', component: OrderComponent }
    ])
  ],
  providers:[
    OrdersRepo
  ]
})
export class OrdersModule { }
