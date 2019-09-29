
import { Injectable, NgZone } from '@angular/core'
import { RxDBService } from '@balnc/core'
import { CommonService, Helpers } from '@balnc/shared'
import * as faker from 'faker'
import { Agreement, AgreementStatus } from '../models/agreement'
import { CEvent, CEventType, Contact } from '../models/contacts'
import { AgreementsEntities } from '../models/_entities'
import { ContactsService } from './contacts.service'

@Injectable()
export class AgreementsService extends CommonService {

  constructor(
    zone: NgZone,
    dbService: RxDBService,
    private contactsService: ContactsService
  ) {
    super(zone, dbService)
  }

  async setup() {
    await super.setup({
      alias: 'agreements',
      entities: AgreementsEntities
    })
  }

  async addAgreement(agreement: Agreement) {
    agreement.serial = Helpers.uid()
    const c = await super.addOne<Agreement>('agreements', agreement)
    await this.contactsService.addOne<CEvent>('cevents', {
      contact: agreement.contact,
      date: Date.now(),
      type: CEventType.AgreementCreated,
      comment: `new agreement #${c.serial}`,
      reference: `/business/agreements/${c['_id']}`
    })
    return c
  }

  async generateDemoData(size = 100) {
    console.log(`generate ${size} agreements`)
    const contacts = await this.contactsService.getAll<Contact[]>('contacts')

    for (let a = 0; a < size; a++) {
      const contact = contacts[faker.random.number({ min: 0, max: contacts.length - 1 })]
      await this.addAgreement({
        contact: contact['_id'],
        status: AgreementStatus.draft,
        createdAt: Date.now(),
        content: `# Agreement ${Date.now()}\n\r${faker.lorem.paragraphs(5)}`
      })
      console.log(`add agreement to contact ${contact['_id']}`)
    }
  }
}
