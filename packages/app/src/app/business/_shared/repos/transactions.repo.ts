
import { Injectable } from '@angular/core'
import { Repository, RxDBService } from '@balnc/core'
import { Transaction } from '../models/transaction'
import { CEventsRepo } from './cevents.repo'

@Injectable()
export class TransactionsRepo extends Repository<Transaction> {

  constructor (
    dbService: RxDBService,
    private ceventsService: CEventsRepo
  ) {
    super(dbService)
    this.entity = 'business.transaction'
  }

  async add (data: Partial<Transaction>, ts?: number): Promise<Transaction> {
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
