import { Injectable } from '@angular/core'
import { RxDBService } from '@balnc/core'
import { CommonService } from '@balnc/shared'
import * as faker from 'faker'
import { CEventType, Contact, ContactType } from '../models/contacts'
import { CEventsService } from './cevents.service'

@Injectable()
export class ContactsService extends CommonService<Contact> {

  constructor(
    dbService: RxDBService,
    private ceventsService: CEventsService
  ) {
    super(dbService)
    this.type = 'contact'
  }

  async add(contact) {
    const c = await super.add(contact)
    await this.ceventsService.add({
      contact: c._id,
      type: CEventType.ContactCreated
    })
    return c
  }

  async generateDemoData(size = 20) {
    console.log(`generate ${size / 2} person/contacts`)
    for (let p = 0; p < size / 2; p++) {
      await this.add({
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
      await this.add({
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
