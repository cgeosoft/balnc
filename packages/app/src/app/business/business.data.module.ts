import { NgModule } from '@angular/core'
import { AccountsRepo } from './@shared/repos/accounts.repo'
import { AgreementsRepo } from './@shared/repos/agreements.repo'
import { CEventsRepo } from './@shared/repos/cevents.repo'
import { ContactsRepo } from './@shared/repos/contacts.repo'
import { InvoicesRepo } from './@shared/repos/invoices.repo'
import { OrdersRepo } from './@shared/repos/orders.repo'
import { RecordsRepo } from './@shared/repos/records.repo'
import { TransactionsRepo } from './@shared/repos/transactions.repo'
import { BusinessDemoService } from './@shared/services/demo.service'

@NgModule({
  providers: [
    BusinessDemoService,

    CEventsRepo,
    ContactsRepo,
    InvoicesRepo,
    OrdersRepo,
    AgreementsRepo,
    TransactionsRepo,
    AccountsRepo,
    RecordsRepo
  ]
})
export class BusinessDataModule {
}
