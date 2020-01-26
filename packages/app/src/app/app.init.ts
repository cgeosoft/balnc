import { ConfigService, RxDBService } from '@balnc/core'
import { BoardsRepo } from './boards/@shared/repos/boards.repo'
import { MessagesRepo } from './boards/@shared/repos/messages.repo'
import { AccountsRepo } from './business/@shared/repos/accounts.repo'
import { AgreementsRepo } from './business/@shared/repos/agreements.repo'
import { CEventsRepo } from './business/@shared/repos/cevents.repo'
import { ContactsRepo } from './business/@shared/repos/contacts.repo'
import { InvoicesRepo } from './business/@shared/repos/invoices.repo'
import { OrdersRepo } from './business/@shared/repos/orders.repo'
import { RecordsRepo } from './business/@shared/repos/records.repo'
import { TransactionsRepo } from './business/@shared/repos/transactions.repo'

export const BUSINESS_REPOS = [
  CEventsRepo,
  ContactsRepo,
  InvoicesRepo,
  OrdersRepo,
  AgreementsRepo,
  TransactionsRepo,
  AccountsRepo,
  RecordsRepo
]

export const MESSAGE_REPOS = [
  MessagesRepo,
  BoardsRepo
]

export const REPOS = [
  ...BUSINESS_REPOS,
  ...MESSAGE_REPOS
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
  recordsRepo: RecordsRepo,

  messagesRepo: MessagesRepo,
  boardsRepo: BoardsRepo
) {
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

    await messagesRepo.warm()
    await boardsRepo.warm()
  }
}
