import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { CEventsRepo } from './cevents.repo'
import { CEventType, Contact } from './contacts'

@Injectable({
  providedIn: 'root'
})
export class ContactsRepo extends Repository<Contact> {

  constructor (
    private ceventsService: CEventsRepo,
    injector: Injector
  ) {
    super(injector)
    this.entity = 'contacts.contact'
  }

  async add (data: Partial<Contact>, group?: string, ts?: number): Promise<Contact> {
    const contact = await super.add(data, group, ts)
    await this.ceventsService.add({
      contact: contact._id,
      type: CEventType.ContactCreated
    }, contact._id, ts)
    return contact
  }
}
