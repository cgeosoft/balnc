import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common/common.module'
import { ContactsModule } from '@balnc/business/contacts/contacts.module'
import { InvoicesModule } from '@balnc/business/invoices/invoices.module'
import { OrderModule } from '@balnc/business/order/order.module'

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
