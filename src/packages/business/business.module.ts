import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CommonModule } from '@balnc/common'

import { ContactsModule, ContactsEntities } from './contacts'
import { InvoicesModule, InvoicesEntities } from './invoices'
import { OrdersModule, OrdersEntities } from './orders'
import { RxDBModule } from '@balnc/core'

@NgModule({
  imports: [
    CommonModule,
    ContactsModule,
    InvoicesModule,
    OrdersModule,
    RouterModule,
    RxDBModule.forChild([
      ...ContactsEntities,
      ...InvoicesEntities,
      ...OrdersEntities
    ])
  ],
  declarations: [],
  providers: [],
  entryComponents: []
})
export class BusinessModule { }
