import { NgModule } from '@angular/core'
import { CommonModule } from '@balnc/common'

import { InvoicesModule } from './invoices/invoices.module'
import { OrdersModule } from './orders/orders.module'
import { ContactsModule } from './contacts/contacts.module'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
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
