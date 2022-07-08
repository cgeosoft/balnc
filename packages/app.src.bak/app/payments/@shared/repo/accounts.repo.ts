
import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { Account } from '../model/account'

@Injectable({
  providedIn: 'root'
})
export class AccountsRepo extends Repository<Account> {

  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'account'
  }

  async add (data: Partial<Account>, group?: string, ts?: number): Promise<Account> {
    const account = await super.add(data, group, ts)
    // await this.ceventsService.add({
    //   contact: account.contact,
    //   type: CEventType.AccountCreated,
    //   comment: `new account #${account.serial}`,
    //   reference: `/accounts/${data.id}`
    // })
    return account
  }

}
