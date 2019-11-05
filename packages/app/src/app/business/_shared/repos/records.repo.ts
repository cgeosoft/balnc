
import { Injectable } from '@angular/core'
import { Repository, RxDBService } from '@balnc/core'
import { Record } from '../models/record'
import { CEventsRepo } from './cevents.repo'

@Injectable()
export class RecordsRepo extends Repository<Record> {

  constructor(
    dbService: RxDBService,
    private ceventsService: CEventsRepo
  ) {
    super(dbService)
    this.entity = 'business.record'
  }

  async add(data: Partial<Record>, ts?: number): Promise<Record> {
    const record = await super.add(data, ts)
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
