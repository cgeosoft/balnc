import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { Account } from '../models/account'

@Injectable()
export class AccountsRepo extends Repository<Account> {

  constructor(
    injector: Injector
  ) {
    super(injector)
    this.entity = 'business.account'
  }

  async add(data: Partial<Account>, ts?: number): Promise<Account> {
    console.log(data)
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
