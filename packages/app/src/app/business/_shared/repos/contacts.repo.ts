import { Injectable } from '@angular/core'
import { Repository, RxDBService } from '@balnc/core'
import { CEventType, Contact } from '../models/contacts'
import { CEventsRepo } from './cevents.repo'

@Injectable()
export class ContactsRepo extends Repository<Contact> {

  constructor(
    dbService: RxDBService,
    private ceventsService: CEventsRepo
  ) {
    super(dbService)
    this.entity = 'business.contact'
  }

  async add(data: Partial<Contact>, ts?: number): Promise<Contact> {
    const contact = await super.add(data, ts)
    await this.ceventsService.add({
      contact: contact._id,
      type: CEventType.ContactCreated
    })
    return contact
  }
}
