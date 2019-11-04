
import { Injectable } from '@angular/core'
import { Entity, Repository, RxDBService } from '@balnc/core'
import { CEventsRepo } from './cevents.repo'

export interface Record extends Entity {
  transaction: string
  account: string
  amount: number
}

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
