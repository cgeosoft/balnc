import { Component, NgZone, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TableSchema } from '@balnc/shared'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import { Contact, ContactType } from '../../@shared/models/contacts'
import { ContactsRepo } from '../../@shared/repos/contacts.repo'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {

  contactType = ContactType

  schema: TableSchema = {
    name: 'contacts',
    properties: [
      { label: 'Name', style: { 'min-width': '300px' }, template: 't1', locked: true },
      { label: 'Phones', style: { width: '150px' }, val: (item: Contact) => item.phones },
      { label: 'Emails', style: { width: '200px' }, val: (item: Contact) => item.emails },
      { label: 'Socials', val: (item: Contact) => item.socials, hidden: true },
      { label: 'Offices', val: (item: Contact) => item.offices, hidden: true },
      { label: 'TaxDetails', val: (item: Contact) => (item.taxDetails) ? item.taxDetails.taxOffice : '-', hidden: true }
    ]
  }

  contacts$: Observable<Contact[]>
  term$: BehaviorSubject<string> = new BehaviorSubject<string>(null)

  constructor (
    private contactsService: ContactsRepo,
    private router: Router,
    private zone: NgZone
  ) { }

  ngOnInit () {
    this.contacts$ = this.contactsService.all$().pipe(
      switchMap(contacts => this.term$.pipe(
        map(term => this.doFilterContacts(contacts, term)),
        tap(() => this.zone.run(() => {
          console.log('done')
        }))
      ))
    )
  }

  filter (term) {
    this.term$.next(term)
  }

  private doFilterContacts (contacts, term) {
    if (!term) return contacts
    return contacts.filter(d => d.name.toUpperCase().startsWith(term.toUpperCase()))
  }

}
