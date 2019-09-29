import { Component, OnInit } from '@angular/core'
import { TableSchema } from '@balnc/shared'
import { Observable } from 'rxjs'
import { Agreement } from '../../_shared/models/agreement'
import { Contact } from '../../_shared/models/contacts'
import { AgreementsService } from '../../_shared/services/agreements.service'
import { ContactsService } from '../../_shared/services/contacts.service'

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  host: { 'class': 'page' }
})
export class AgreementsComponent implements OnInit {
  agreements$: Observable<Agreement[]>
  contacts: Contact[]

  schema: TableSchema = {
    name: 'agreements',
    properties: [
      {
        label: 'Serial', locked: true, type: 'link', val: (item: Agreement) => {
          return {
            label: item.serial,
            link: ['/business/agreements', item['_id']]
          }
        }
      },
      { label: 'Date', type: 'date', val: (item: Agreement) => { return item.createdAt } },
      {
        label: 'Contact', type: 'link', val: (item: Agreement) => {
          const c = this.contacts.find(c => c['_id'] === item.contact)
          return {
            label: c.name,
            link: ['/business/contacts', item.contact]
          }
        }
      }
    ]
  }

  constructor(
    private agreementsService: AgreementsService,
    private contactsService: ContactsService
  ) { }

  async ngOnInit() {
    this.agreements$ = this.agreementsService.getAll$<Agreement>('agreements')
    this.contacts = await this.contactsService.getAll<Contact>('contacts')
  }
}
