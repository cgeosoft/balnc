
import { Injectable } from '@angular/core'
import { Entity, Repository, RxDBService } from '@balnc/core'
import { CEventsRepo } from './cevents.repo'

export interface Transaction extends Entity {
  from?: string
  to?: string
  amount: number
  executed?: number
  planned?: number
  aggreement?: string
  invoice?: string
}

@Injectable()
export class TransactionsRepo extends Repository<Transaction> {

  constructor(
    dbService: RxDBService,
    private ceventsService: CEventsRepo
  ) {
    super(dbService)
    this.entity = 'business.transaction'
  }

  async add(data: Partial<Transaction>, ts?: number): Promise<Transaction> {
    const transaction = await super.add(data, ts)
    // await this.ceventsService.add({
    //   contact: transaction.contact,
    //   type: CEventType.TransactionCreated,
    //   comment: `new transaction #${transaction.serial}`,
    //   reference: `/business/transactions/${data._id}`
    // })
    return transaction
  }
}
