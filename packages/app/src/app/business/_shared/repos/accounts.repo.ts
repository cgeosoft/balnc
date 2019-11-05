
import { Injectable } from '@angular/core'
import { Repository, RxDBService } from '@balnc/core'
import { Account } from '../models/account'
import { CEventsRepo } from './cevents.repo'

@Injectable()
export class AccountsRepo extends Repository<Account> {

  constructor(
    dbService: RxDBService,
    private ceventsService: CEventsRepo
  ) {
    super(dbService)
    this.entity = 'business.account'
  }

  async add(data: Partial<Account>, ts?: number): Promise<Account> {
    const account = await super.add(data, ts)
    // await this.ceventsService.add({
    //   contact: account.contact,
    //   type: CEventType.AccountCreated,
    //   comment: `new account #${account.serial}`,
    //   reference: `/business/accounts/${data._id}`
    // })
    return account
  }

}
