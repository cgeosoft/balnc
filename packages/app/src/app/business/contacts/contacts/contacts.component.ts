import { Component, OnInit } from '@angular/core'
import { TableSchema } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { BehaviorSubject, Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Contact, ContactType } from '../../@shared/models/contacts'
import { ContactsRepo } from '../../@shared/repos/contacts.repo'
import { ContactCreateComponent } from './../contact-create/contact-create.component'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {

  contactType = ContactType

  schema: TableSchema = {
    name: 'contacts',
    sort: 'Name',
    properties: [
      { label: 'Name', style: { 'min-width': '300px' }, template: 't1', locked: true, d: (i) => i.c.name, val: (item: Contact) => item.name },
      { label: 'Phones', style: { width: '150px' }, d: (i) => i.c.phones[0], val: (item: Contact) => item.phones },
      { label: 'Emails', style: { width: '200px' }, d: (i) => i.c.emails[0], val: (item: Contact) => item.emails },
      { label: 'Tags', style: { width: '200px' }, d: (i) => i.c.name, val: (item: Contact) => item._tags ? item._tags.join(', ') : null, hidden: true },
      { label: 'Socials', style: { width: '200px' }, d: (i) => i.c.name, val: (item: Contact) => item.socials, hidden: true },
      { label: 'Offices', style: { width: '200px' }, d: (i) => i.c.name, val: (item: Contact) => item.offices, hidden: true },
      { label: 'TaxDetails', style: { width: '200px' }, d: (i) => i.c.name, val: (item: Contact) => (item.taxDetails) ? item.taxDetails.taxOffice : '-', hidden: true }
    ]
  }

  contacts$: Observable<Contact[]> = new Observable<Contact[]>()
  term$: BehaviorSubject<string> = new BehaviorSubject<string>(null)
  ts: number

  constructor (
    private contactsRepo: ContactsRepo,
    private modal: NgbModal
  ) { }

  ngOnInit () {
    this.ts = Date.now()
    console.log(`load...`)
    this.contacts$ = this.contactsRepo.all$().pipe(
      tap((c) => {
        console.log(`loaded ${c.length} in ${Date.now() - this.ts}`)
        this.ts = Date.now()
      })
    )
  }

  filter (term) {
    this.term$.next(term)
  }

  createContact () {
    this.modal.open(ContactCreateComponent)
  }

  private doFilterContacts (contacts, term) {
    if (!term) return contacts
    return contacts.filter(d => d.name.toUpperCase().startsWith(term.toUpperCase()))
  }

}
