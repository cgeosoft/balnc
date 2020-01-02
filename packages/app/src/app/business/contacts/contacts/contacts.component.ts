import { Component, OnInit } from '@angular/core'
import { TableSchema } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
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
    properties: [
      { label: 'Name', style: { 'min-width': '300px' }, template: 't1', locked: true },
      { label: 'Phones', style: { width: '150px' }, val: (item: Contact) => item.phones },
      { label: 'Emails', style: { width: '200px' }, val: (item: Contact) => item.emails },
      { label: 'Tags', style: { width: '200px' }, val: (item: Contact) => item.tags.join(', '), hidden: true },
      { label: 'Socials', style: { width: '200px' }, val: (item: Contact) => item.socials, hidden: true },
      { label: 'Offices', style: { width: '200px' }, val: (item: Contact) => item.offices, hidden: true },
      { label: 'TaxDetails', style: { width: '200px' }, val: (item: Contact) => (item.taxDetails) ? item.taxDetails.taxOffice : '-', hidden: true }
    ]
  }

  contacts$: Observable<Contact[]>
  term$: BehaviorSubject<string> = new BehaviorSubject<string>(null)

  constructor (
    private contactsService: ContactsRepo,
    private modal: NgbModal
  ) { }

  ngOnInit () {
    this.contacts$ = this.contactsService.all$().pipe(
      switchMap(contacts => this.term$.pipe(
        map(term => this.doFilterContacts(contacts, term))
      ))
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
