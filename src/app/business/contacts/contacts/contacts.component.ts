import { Component, OnInit } from '@angular/core'
import { TableSchema } from '@balnc/shared'
import { Observable } from 'rxjs'
import { Contact, ContactType } from '../../_shared/models/contacts'
import { ContactsService } from '../../_shared/services/contacts.service'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  host: { 'class': 'page' }
})
export class ContactsComponent implements OnInit {

  contactType = ContactType

  schema: TableSchema = {
    properties: [
      { label: 'Name', val: (item: Contact) => { return item.name } },
      { label: 'Phones', val: (item: Contact) => { return item.details.phones } },
      { label: 'Emails', val: (item: Contact) => { return item.details.emails } },
      { label: 'Socials', val: (item: Contact) => { return item.details.socials } },
      { label: 'Offices', val: (item: Contact) => { return item.details.offices } },
      { label: 'TaxDetails', val: (item: Contact) => { return (item.details.taxDetails) ? item.details.taxDetails.taxOffice : '-' } }
    ]
  }

  contacts$: Observable<Contact[]>

  constructor (
    private contactsService: ContactsService
  ) { }

  ngOnInit (): void {
    this.contacts$ = this.contactsService.contacts$
  }

}
