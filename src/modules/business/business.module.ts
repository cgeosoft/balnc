import { NgModule } from '@angular/core'
import { CommonModule } from '@balnc/common'

import { InvoicesModule } from './invoices/invoices.module'
import { OrdersModule } from './orders/orders.module'
import { ContactsModule } from './contacts/contacts.module'

@NgModule({
  imports: [
    CommonModule,
    ContactsModule,
    InvoicesModule,
    OrdersModule
  ],
  declarations: [],
  providers: [],
  entryComponents: []
})
export class BusinessModule { }
