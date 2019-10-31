import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TableSchema } from '@balnc/shared'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { Contact, ContactType } from '../../_shared/models/contacts'
import { ContactsRepo } from '../../_shared/repos/contacts.repo'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  host: { 'class': 'page' }
})
export class ContactsComponent implements OnInit {

  contactType = ContactType

  schema: TableSchema = {
    name: 'contacts',
    properties: [
      { label: 'Name', style: { 'min-width': '300px' }, template: 't1', locked: true },
      { label: 'Phones', style: { width: '150px' }, val: (item: Contact) => item.data.details.phones },
      { label: 'Emails', style: { width: '200px' }, val: (item: Contact) => item.data.details.emails },
      { label: 'Socials', val: (item: Contact) => item.data.details.socials, hidden: true },
      { label: 'Offices', val: (item: Contact) => item.data.details.offices, hidden: true },
      { label: 'TaxDetails', val: (item: Contact) => (item.data.details.taxDetails) ? item.data.details.taxDetails.taxOffice : '-', hidden: true }
    ]
  }

  contacts$: Observable<Contact[]>
  term$: BehaviorSubject<string> = new BehaviorSubject<string>(null)

  constructor(
    private contactsService: ContactsRepo,
    private router: Router
  ) { }

  async ngOnInit() {
    this.contacts$ = this.contactsService.all$().pipe(
      switchMap(contacts => this.term$.pipe(
        map(term => this.doFilterContacts(contacts, term))
      ))
    )
    await this.contactsService.generateDemoData()
  }

  filter(term) {
    this.term$.next(term)
  }

  private doFilterContacts(contacts, term) {
    if (!term) return contacts
    return contacts.filter(d => d.name.toUpperCase().startsWith(term.toUpperCase()))
  }

}
