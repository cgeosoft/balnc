import { Injectable, NgZone } from '@angular/core'
import { RxDBService } from '@balnc/core'
import { CommonService } from '@balnc/shared'
import * as faker from 'faker'
import { Observable } from 'rxjs'
import { CEvent, CEventType, Contact, ContactType } from '../models/contacts'
import { ContactsEntities } from '../models/_entities'

@Injectable()
export class ContactsService extends CommonService {

  contacts$: Observable<Contact[]>

  constructor(
    zone: NgZone,
    dbService: RxDBService
  ) {
    super(zone, dbService)
  }

  async setup() {
    await super.setup({
      alias: 'contacts',
      entities: ContactsEntities
    })
    this.contacts$ = this.db['contacts'].find().$
  }

  async getContacts(params): Promise<Contact[]> {
    return super.getAll<Contact>('contacts', params)
  }

  async getContact(id): Promise<Contact> {
    const contact = await super.getOne<Contact>('contacts', id)
    if (!contact) return null

    // await super.addOne<CEvent>('cevents', {
    //   contact: id,
    //   date: Date.now(),
    //   type: CEventType.ContactAccessed
    // })
    return contact
  }

  getContactObservable(id): Observable<Contact> {
    return this.db['contacts'].findOne(id).$
  }

  async addContact(contact: Contact) {
    const c = await super.addOne<Contact>('contacts', contact)
    await super.addOne<CEvent>('cevents', {
      contact: c.get('_id'),
      date: Date.now(),
      type: CEventType.ContactCreated
    })
    return c
  }

  async generateDemoData(size = 200) {
    console.log(`generate ${size / 2} person/contacts`)
    for (let p = 0; p < size / 2; p++) {
      await this.addContact({
        name: `${faker.name.findName()}`,
        type: ContactType.person,
        tags: [],
        details: {
          avatar: `${faker.image.avatar()}`,
          phones: [faker.phone.phoneNumberFormat()],
          emails: [faker.internet.email()]
        },
        conns: [{
          reference: 'company1',
          type: 'owner'
        }]
      })
      console.log(`add person ${p}`)
    }

    console.log(`generate ${size / 2} company/contacts`)
    for (let c = 0; c < size / 2; c++) {
      await this.addContact({
        name: `${faker.company.companyName()}`,
        type: ContactType.company,
        tags: [],
        details: {
          avatar: `${faker.image.avatar()}`,
          phones: [faker.phone.phoneNumberFormat()],
          emails: [faker.internet.email()],
          taxDetails: {
            vatNumber: `VAT${faker.random.number({ min: 1000000000, max: 9999999999 })}`,
            taxOffice: faker.address.city(3),
            address: faker.address.streetAddress(true),
            legalName: '',
            description: ''
          }
        },
        conns: [{
          reference: 'person1',
          type: 'owner'
        }]
      })
      console.log(`add company ${c}`)
    }
  }
}
