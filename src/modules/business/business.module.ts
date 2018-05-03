import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@blnc/common/common.module'
import { ContactsModule } from '@blnc/business/contacts/contacts.module'
import { InvoicesModule } from '@blnc/business/invoices/invoices.module'
import { OrderModule } from '@blnc/business/order/order.module'

@NgModule({
  imports: [
    CommonModule,
    ContactsModule,
    InvoicesModule,
    OrderModule,
  ],
  declarations: [],
  providers: [],
})
export class BusinessModule { }
