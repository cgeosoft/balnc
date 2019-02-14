import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../_shared'
import { ContactsModule } from './contacts/contacts.module'
import { InvoicesModule } from './invoices/invoices.module'
import { OrdersModule } from './orders/orders.module'

@NgModule({
  imports: [
    SharedModule,
    ContactsModule,
    InvoicesModule,
    OrdersModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'contacts', pathMatch: 'full' }
    ])
  ],
  declarations: [],
  providers: [],
  entryComponents: []
})
export class BusinessModule { }
