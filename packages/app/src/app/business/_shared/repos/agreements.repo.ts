import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { Helpers } from '@balnc/shared'
import { Agreement } from '../models/agreement'
import { CEventType } from '../models/contacts'
import { CEventsRepo } from './cevents.repo'

@Injectable()
export class AgreementsRepo extends Repository<Agreement> {

  constructor(
    injector: Injector,
    private ceventsService: CEventsRepo
  ) {
    super(injector)
    this.entity = 'business.agreement'
  }

  async add(data: Partial<Agreement>, ts?: number): Promise<Agreement> {
    data.serial = Helpers.uid()
    const agreement = await super.add(data, ts)
    await this.ceventsService.add({
      contact: agreement.contact,
      type: CEventType.AgreementCreated,
      comment: `new agreement #${agreement.serial}`,
      reference: `/business/agreements/${data._id}`
    })
    return agreement
  }

}
