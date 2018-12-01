import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CommonModule } from '@balnc/common'

import { ContactsModule, ContactsEntities } from './contacts'
import { InvoicesModule, InvoicesEntities } from './invoices'
import { OrdersModule, OrdersEntities } from './orders'

@NgModule({
  imports: [
    CommonModule,
    ContactsModule,
    InvoicesModule,
    OrdersModule,
    RouterModule,
  ],
  declarations: [],
  providers: [],
  entryComponents: []
})
export class BusinessModule { }
