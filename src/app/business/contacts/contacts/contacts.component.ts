import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TableSchema } from '@balnc/shared'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
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
    name: 'contacts',
    properties: [
      { label: 'Name', style: { 'min-width': '300px' }, template: 't1', locked: true },
      { label: 'Phones', style: { width: '150px' }, val: (item: Contact) => { return item.details.phones } },
      { label: 'Emails', style: { width: '200px' }, val: (item: Contact) => { return item.details.emails } },
      { label: 'Socials', val: (item: Contact) => { return item.details.socials }, hidden: true },
      { label: 'Offices', val: (item: Contact) => { return item.details.offices }, hidden: true },
      { label: 'TaxDetails', val: (item: Contact) => { return (item.details.taxDetails) ? item.details.taxDetails.taxOffice : '-' }, hidden: true }
    ]
  }

  contacts$: Observable<Contact[]>
  term$: BehaviorSubject<string> = new BehaviorSubject<string>(null)

  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.contacts$ = this.contactsService.contacts$.pipe(
      switchMap(contacts => this.term$.pipe(
        map(term => this.doFilterContacts(contacts, term))
      ))
    )
  }

  filter(term) {
    this.term$.next(term)
  }

  private doFilterContacts(contacts, term) {
    if (!term) return contacts
    return contacts.filter(d => d.name.toUpperCase().startsWith(term.toUpperCase()))
  }

}
