
import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { Record } from '../models/record'

@Injectable({
  providedIn: 'root'
})
export class RecordsRepo extends Repository<Record> {

  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'business.record'
  }

  async add (data: Partial<Record>, group?: string, ts?: number): Promise<Record> {
    const record = await super.add(data, group, ts)
    // if (acccount) {
    //   const account = await this.account.
    // }
    // await this.ceventsService.add({
    //   contact: record.contact,
    //   type: CEventType.RecordCreated,
    //   comment: `new record #${record.serial}`,
    //   reference: `/business/records/${data._id}`
    // })
    return record
  }

}
