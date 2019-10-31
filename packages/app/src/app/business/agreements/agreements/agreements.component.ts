import { Component, OnInit } from '@angular/core'
import { TableSchema } from '@balnc/shared'
import { Observable } from 'rxjs'
import { Agreement } from '../../_shared/models/agreement'
import { Contact } from '../../_shared/models/contacts'
import { AgreementsService } from '../../_shared/repos/agreements.repo'
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
        label: 'Serial', locked: true, type: 'link', val: (item: Agreement) => {
          return {
            label: item.data.serial,
            link: ['/business/agreements', item._id]
          }
        }
      },
      { label: 'Date', type: 'date', val: (item: Agreement) => { return item.data.createdAt } },
      {
        label: 'Contact', type: 'link', val: (item: Agreement) => {
          const c = this.contacts.find(c => c._id === item.data.contact)
          return {
            label: c.data.name,
            link: ['/business/contacts', item.data.contact]
          }
        }
      }
    ]
  }

  constructor(
    private agreementsService: AgreementsService,
    private contactsService: ContactsRepo
  ) { }

  async ngOnInit() {
    this.agreements$ = this.agreementsService.all$()
    this.contacts = await this.contactsService.all()
  }
}
