import { Component, OnInit } from '@angular/core'
import { TableSchema } from '@balnc/shared'
import { Observable } from 'rxjs'
import { Agreement } from '../../_shared/models/agreement'
import { Contact } from '../../_shared/models/contacts'
import { AgreementsRepo } from '../../_shared/repos/agreements.repo'
import { ContactsRepo } from '../../_shared/repos/contacts.repo'

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
        label: 'Serial', style: { width: '100px' }, locked: true, type: 'link', val: (item: Agreement) => {
          return {
            label: item.serial,
            link: ['/business/agreements', item._id]
          }
        }
      },
      { label: 'Date', style: { width: '160px' }, type: 'date', val: (item: Agreement) => { return item._timestamp } },
      {
        label: 'Contact', type: 'link', val: (item: Agreement) => {
          const c = this.contacts.find(c => c._id === item.contact)
          return {
            label: c.name,
            link: ['/business/contacts', item.contact]
          }
        }
      }
    ]
  }

  constructor(
    private agreementsService: AgreementsRepo,
    private contactsService: ContactsRepo
  ) { }

  async ngOnInit() {
    this.agreements$ = this.agreementsService.all$()
    this.contacts = await this.contactsService.all()
  }
}
