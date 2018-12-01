import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@balnc/common'

import { InvoicesModule } from './invoices'
import { OrdersModule } from './orders'
import { ContactsModule } from './contacts/contacts.module';

@NgModule({
  imports: [
    CommonModule,
    ContactsModule,
    InvoicesModule,
    OrdersModule,
    RouterModule
  ],
  declarations: [],
  providers: [],
  entryComponents: []
})
export class BusinessModule { }
