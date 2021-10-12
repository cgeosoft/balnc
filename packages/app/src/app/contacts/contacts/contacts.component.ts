import { Component, OnInit } from '@angular/core'
import { TableSchema } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { BehaviorSubject, Observable } from 'rxjs'
import { Contact, ContactType } from '../@shared/contacts'
import { ContactsRepo } from '../@shared/contacts.repo'
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
      { label: 'Name', style: { 'min-width': '300px' }, template: 't1', locked: true, d: (i) => i.c.name },
      { label: 'Phones', style: { width: '150px' }, d: (i) => i.c.phones[0], val: (item: Contact) => item.phones },
      { label: 'Emails', style: { width: '200px' }, d: (i) => i.c.emails[0], val: (item: Contact) => item.emails },
      { label: 'Tags', style: { width: '200px' }, d: (i) => i.c.name, val: (item: Contact) => item.tags ? item.tags.join(', ') : null, hidden: true },
      { label: 'Socials', style: { width: '200px' }, d: (i) => i.c.name, val: (item: Contact) => item.socials, hidden: true },
      { label: 'Offices', style: { width: '200px' }, d: (i) => i.c.name, val: (item: Contact) => item.offices, hidden: true },
      { label: 'TaxDetails', style: { width: '200px' }, d: (i) => i.c.name, val: (item: Contact) => (item.taxDetails) ? item.taxDetails.taxOffice : '-', hidden: true }
    ]
  }

  contacts$: Observable<Contact[]> = new Observable<Contact[]>()
  term$: BehaviorSubject<string> = new BehaviorSubject<string>(null)

  constructor(
    private contactsRepo: ContactsRepo,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.contacts$ = this.contactsRepo.all$()
  }

  filter(term) {
    this.term$.next(term)
  }

  createContact() {
    this.modal.open(ContactCreateComponent)
  }

  private doFilterContacts(contacts, term) {
    if (!term) return contacts
    return contacts.filter(d => d.name.toUpperCase().startsWith(term.toUpperCase()))
  }

}
