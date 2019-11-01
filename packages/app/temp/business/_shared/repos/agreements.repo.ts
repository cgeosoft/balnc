
import { Injectable } from '@angular/core'
import { RxDBService } from '@balnc/core'
import { Helpers, Repository } from '@balnc/shared'
import * as faker from 'faker'
import { Agreement, AgreementStatus } from '../models/agreement'
import { CEventType } from '../models/contacts'
import { CEventsRepo } from './cevents.repo'
import { ContactsRepo } from './contacts.repo'

@Injectable()
export class AgreementsService extends Repository<Agreement> {

  constructor(
    dbService: RxDBService,
    private contactsService: ContactsRepo,
    private ceventsService: CEventsRepo
  ) {
    super(dbService)
    this.entity = 'agreement'
  }

  async add(agreement: Partial<Agreement>) {
    agreement.serial = Helpers.uid()
    const c = await super.add(agreement)
    await this.ceventsService.add({
      data: {
        contact: agreement.contact,
        date: Date.now(),
        type: CEventType.AgreementCreated,
        comment: `new agreement #${c.serial}`,
        reference: `/business/agreements/${c['_id']}`
      }
    })
    return c
  }

  async generateDemoData(size = 100) {
    console.log(`generate ${size} agreements`)
    const contacts = await this.contactsService.all()

    for (let a = 0; a < size; a++) {
      const contact = contacts[faker.random.number({ min: 0, max: contacts.length - 1 })]
      await this.add({
        data: {
          contact: contact._id,
          status: AgreementStatus.draft,
          createdAt: Date.now(),
          content: `# Agreement ${Date.now()}\n\r${faker.lorem.paragraphs(5)}`
        }
      })
      console.log(`add agreement to contact ${contact['_id']}`)
    }
  }
}
