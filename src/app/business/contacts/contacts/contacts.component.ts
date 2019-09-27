import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TableSchema } from '@balnc/shared'
import { BehaviorSubject, Observable } from 'rxjs'
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
      { label: 'Name', style: { 'width': '250px' }, template: 't1', locked: true },
      { label: 'Phones', val: (item: Contact) => { return item.details.phones } },
      { label: 'Emails', val: (item: Contact) => { return item.details.emails } },
      { label: 'Socials', val: (item: Contact) => { return item.details.socials } },
      { label: 'Offices', val: (item: Contact) => { return item.details.offices } },
      { label: 'TaxDetails', val: (item: Contact) => { return (item.details.taxDetails) ? item.details.taxDetails.taxOffice : '-' } }
    ]
  }

  contacts$: Observable<Contact[]>
  term$: BehaviorSubject<string> = new BehaviorSubject<string>(null)

  constructor (
    private contactsService: ContactsService,
    private router: Router
  ) { }

  ngOnInit (): void {
    this.contacts$ = this.contactsService.contacts$
  }

  filter (term) {
    this.term$.next(term)
  }

}
