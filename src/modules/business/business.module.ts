import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContactsModule } from '@balnc/business/contacts/contacts.module'
import { InvoicesModule } from '@balnc/business/invoices/invoices.module'
import { OrderModule } from '@balnc/business/order/order.module'

@NgModule({
  imports: [
    ContactsModule,
    InvoicesModule,
    OrderModule,
  ],
  declarations: [],
  providers: [],
})
export class BusinessModule { }
