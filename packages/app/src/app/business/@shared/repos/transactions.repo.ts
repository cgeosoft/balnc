
import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { Transaction } from '../models/transaction'

@Injectable({
  providedIn: 'root'
})
export class TransactionsRepo extends Repository<Transaction> {

  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'business.transaction'
  }

  async add (data: Partial<Transaction>, group?: string, ts?: number): Promise<Transaction> {
    const transaction = await super.add(data, group, ts)
    // await this.ceventsService.add({
    //   contact: transaction.contact,
    //   type: CEventType.TransactionCreated,
    //   comment: `new transaction #${transaction.serial}`,
    //   reference: `/business/transactions/${data._id}`
    // })
    return transaction
  }
}
