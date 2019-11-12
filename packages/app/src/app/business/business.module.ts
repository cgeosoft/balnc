import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { InvoiceComponent } from './invoice/invoice.component'
import { OrderCreateComponent } from './order-create/order-create.component'
import { OrderComponent } from './order/order.component'
import { QuickSearchComponent } from './quick-search/quick-search.component'
import { SearchComponent } from './search/search.component'
import { SettingsComponent } from './settings/settings.component'
import { AccountsRepo } from './_shared/repos/accounts.repo'
import { AgreementsRepo } from './_shared/repos/agreements.repo'
import { CEventsRepo } from './_shared/repos/cevents.repo'
import { ContactsRepo } from './_shared/repos/contacts.repo'
import { InvoicesRepo } from './_shared/repos/invoices.repo'
import { OrdersRepo } from './_shared/repos/orders.repo'
import { RecordsRepo } from './_shared/repos/records.repo'
import { TransactionsRepo } from './_shared/repos/transactions.repo'
import { DemoService } from './_shared/services/demo.service'
import { StateService } from './_shared/services/state.service'
import { ShellComponent } from './_shell/shell.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: ShellComponent,
      children: [
        { path: 'orders/:id', component: OrderComponent },
        { path: 'search', component: SearchComponent },
        { path: 'invoices/:id', component: InvoiceComponent },
        { path: 'settings', component: SettingsComponent },
        {
          path: 'contacts',
          loadChildren: './contacts/contacts.module#ContactsModule'
        }, {
          path: 'payments',
          loadChildren: './payments/payments.module#PaymentsModule'
        }, {
          path: 'agreements',
          loadChildren: './agreements/agreements.module#AgreementsModule'
        },
        { path: '', redirectTo: 'contacts', pathMatch: 'full' }
      ]
    }])
  ],
  declarations: [
    ShellComponent,
    SettingsComponent,
    QuickSearchComponent,
    OrderComponent,
    InvoiceComponent,
    SearchComponent,
    OrderCreateComponent
  ],
  providers: [
    CEventsRepo,
    ContactsRepo,
    InvoicesRepo,
    OrdersRepo,
    StateService,
    AgreementsRepo,
    DemoService,
    TransactionsRepo,
    AccountsRepo,
    RecordsRepo
  ],
  entryComponents: [
    QuickSearchComponent,
    OrderCreateComponent
  ]
})
export class BusinessModule { }
