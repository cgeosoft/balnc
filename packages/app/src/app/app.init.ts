import { ConfigService, RxDBService } from '@balnc/core'
import { AccountsRepo } from './business/@shared/repos/accounts.repo'
import { AgreementsRepo } from './business/@shared/repos/agreements.repo'
import { CEventsRepo } from './business/@shared/repos/cevents.repo'
import { ContactsRepo } from './business/@shared/repos/contacts.repo'
import { InvoicesRepo } from './business/@shared/repos/invoices.repo'
import { OrdersRepo } from './business/@shared/repos/orders.repo'
import { RecordsRepo } from './business/@shared/repos/records.repo'
import { TransactionsRepo } from './business/@shared/repos/transactions.repo'

export const REPOS = [
  CEventsRepo,
  ContactsRepo,
  InvoicesRepo,
  OrdersRepo,
  AgreementsRepo,
  TransactionsRepo,
  AccountsRepo,
  RecordsRepo
]

export function initApp (
  configService: ConfigService,
  rxdbService: RxDBService,
  cEventsRepo: CEventsRepo,
  contactsRepo: ContactsRepo,
  invoicesRepo: InvoicesRepo,
  ordersRepo: OrdersRepo,
  agreementsRepo: AgreementsRepo,
  transactionsRepo: TransactionsRepo,
  accountsRepo: AccountsRepo,
  recordsRepo: RecordsRepo) {
  return async () => {
    configService.setup()
    await rxdbService.setup()
    await cEventsRepo.warm()
    await contactsRepo.warm()
    await invoicesRepo.warm()
    await ordersRepo.warm()
    await agreementsRepo.warm()
    await transactionsRepo.warm()
    await accountsRepo.warm()
    await recordsRepo.warm()
  }
}
