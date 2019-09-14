
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

  constructor (
    zone: NgZone,
    dbService: RxDBService,
    private contactsService: ContactsService
  ) {
    super(zone, dbService)
  }

  async setup () {
    await super.setup({
      alias: 'agreements',
      entities: AgreementsEntities
    })
  }

  async addAgreement (agreement: Agreement) {
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

  async generateDemoData () {
    console.log('generate random agreements')

    const contacts = await this.contactsService.getAll<Contact[]>('contacts')
    contacts.forEach(async contact => {
      for (let p = 0; p < 2; p++) {
        await this.addAgreement({
          contact: contact['_id'],
          status: AgreementStatus.draft,
          createdAt: Date.now(),
          content: `# Agreement ${Date.now()}\n\r${faker.lorem.paragraphs(5)}`
        })
      }
    })
  }
}
