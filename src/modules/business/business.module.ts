import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContactsModule } from '@balnc/business/contacts/contacts.module'
import { InvoiceModule } from '@balnc/business/invoice/invoice.module'
import { OrderModule } from '@balnc/business/order/order.module'

@NgModule({
  imports: [
    ContactsModule,
    InvoiceModule,
    OrderModule,
  ],
  declarations: [],
  providers: [],
})
export class BusinessModule { }
