import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { BUSINESS_ROUTES } from './@shared/models/constants'
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
import { QuickSearchComponent } from './quick-search/quick-search.component'
import { SearchComponent } from './search/search.component'
import { SettingsComponent } from './settings/settings.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(BUSINESS_ROUTES)
  ],
  declarations: [
    ShellComponent,
    SettingsComponent,
    QuickSearchComponent,
    SearchComponent
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
    QuickSearchComponent
  ]
})
export class BusinessModule { }
