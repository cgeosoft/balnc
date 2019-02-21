import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../_shared';
import { ContactsModule } from './contacts/contacts.module';
import { ContactsRoutes } from './contacts/contacts.routes';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoicesRoutes } from './invoices/invoices.routes';
import { OrdersModule } from './orders/orders.module';
import { OrdersRoutes } from './orders/orders.routes';
import { ShellComponent } from './_shell/shell.component';

@NgModule({
  imports: [
    SharedModule,
    ContactsModule,
    InvoicesModule,
    OrdersModule,
    RouterModule.forChild([{
      path: '',
      component: ShellComponent,
      children: [
        ...ContactsRoutes,
        ...InvoicesRoutes,
        ...OrdersRoutes
      ]
    },{
      path: '', redirectTo: 'contacts', pathMatch: 'full' }
    ])
  ],
  declarations: [
    ShellComponent
  ],
  providers: [],
  entryComponents: []
})
export class BusinessModule { }
