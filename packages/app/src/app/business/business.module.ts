import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { AccountsRepo } from './@shared/repos/accounts.repo'
import { AgreementsRepo } from './@shared/repos/agreements.repo'
import { CEventsRepo } from './@shared/repos/cevents.repo'
import { ContactsRepo } from './@shared/repos/contacts.repo'
import { InvoicesRepo } from './@shared/repos/invoices.repo'
import { OrdersRepo } from './@shared/repos/orders.repo'
import { RecordsRepo } from './@shared/repos/records.repo'
import { TransactionsRepo } from './@shared/repos/transactions.repo'
import { DemoService } from './@shared/services/demo.service'
import { StateService } from './@shared/services/state.service'
import { ShellComponent } from './@shell/shell.component'
import { InvoiceComponent } from './invoice/invoice.component'
import { OrderCreateComponent } from './order-create/order-create.component'
import { OrderComponent } from './order/order.component'
import { QuickSearchComponent } from './quick-search/quick-search.component'
import { SearchComponent } from './search/search.component'
import { SettingsComponent } from './settings/settings.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      data: {
        breadcrumb: {
          label: 'Business'
        }
      },
      component: ShellComponent,
      children: [
        {
          path: 'orders/:id',
          data: {
            breadcrumb: {
              label: '#Order'
            }
          },
          component: OrderComponent
        },
        {
          path: 'search',
          component: SearchComponent
        },
        {
          path: 'invoices/:id',
          component: InvoiceComponent
        },
        {
          path: 'settings',
          data: {
            breadcrumb: {
              label: 'Settings'
            }
          },
          component: SettingsComponent
        },
        {
          path: 'contacts',
          data: {
            breadcrumb: {
              label: 'Contacts'
            }
          },
          loadChildren: './contacts/contacts.module#ContactsModule'
        }, {
          path: 'payments',
          loadChildren: './payments/payments.module#PaymentsModule'
        }, {
          path: 'agreements',
          data: {
            breadcrumb: {
              label: 'Agreements'
            }
          },
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
