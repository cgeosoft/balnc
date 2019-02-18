import { Injectable } from '@angular/core'
import { CommonService } from '@balnc/core'
import * as faker from 'faker'
import { Observable, Subject } from 'rxjs'
import { Contact, ContactLogType, RxContactDoc } from './models/all.model'
import { ContactsEntities } from './models/entities'
import { tap } from 'rxjs/operators';

@Injectable()
export class ContactsService extends CommonService {

  alias = 'contacts'
  entities = ContactsEntities

  public contacts$: Observable<Contact[]>
  public lastAccessed$: Subject<Contact[]> = new Subject<Contact[]>()

  async resolve() {
    await super.resolve()
    this.db['contacts'].find().$.subscribe(contacts => {
      contacts
        .sort((ca, cb) => {
          const caLastUpdate = new Date(ca.logs[ca.logs.length - 1].date)
          const cbLastUpdate = new Date(cb.logs[cb.logs.length - 1].date)
          return cbLastUpdate.getTime() - caLastUpdate.getTime()
        })
      this.lastAccessed$.next(contacts.slice(0, 5))
    })
    this.contacts$ = this.db['contacts'].find().$
  }

  async getContacts(params): Promise<Contact[]> {
    return super.getAll<Contact>('contacts', params)
  }

  async getContact(id): Promise<Contact> {
    const contact = await super.getOne<Contact>('contacts', id)
    if (!contact) return null

    contact.atomicUpdate(c => {
      c.logs.push({
        date: new Date(),
        type: ContactLogType.Access
      })
      return c
    })

    // await contact.save()

    return contact
  }

  getContactObservable(id): Observable<Contact> {
    return this.db['contacts'].findOne(id).$
    // return super.getOne<Contact>('contacts', id).$
    // if (!contact) return null

    // contact.atomicUpdate(c => {
    //   c.logs.push({
    //     date: new Date(),
    //     type: ContactLogType.Access
    //   })
    //   return c
    // })
  }

  async addContacts(contact: Contact) {
    return super.addOne('contacts', contact)
  }

  async generateDemoData() {
    const cs: Contact[] = []

    for (let p = 0; p < 5; p++) {
      const person: Contact & any = {
        name: `${faker.name.findName()}`,
        tags: ['person'],
        details: {
          avatar: `${faker.image.avatar()}`,
          phones: [faker.phone.phoneNumberFormat()],
          emails: [faker.internet.email()]
        },
        conns: [{
          reference: 'company1',
          type: 'owner'
        }],
        logs: [{
          date: new Date(),
          type: ContactLogType.Create
        }, {
          date: new Date(),
          type: ContactLogType.AddConnection,
          reference: 'company1'
        }]
      }
      cs.push(person)
    }

    for (let c = 0; c < 10; c++) {

      const company: Contact & any = {
        name: `${faker.company.companyName()}`,
        tags: ['company'],
        details: {
          avatar: `${faker.image.avatar()}`,
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
        }],
        logs: [{
          date: new Date(),
          type: ContactLogType.Create
        }, {
          date: new Date(),
          type: ContactLogType.AddConnection,
          reference: 'person1'
        }]
      }
      cs.push(company)
    }

    cs.forEach(async (v: RxContactDoc) => {
      await this.db['contacts'].insert(v)
    })
  }
}
