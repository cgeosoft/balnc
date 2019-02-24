import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Contact, ContactLogType } from '../_shared/models/_all';
import { ContactsService } from '../_shared/services/contacts.service';

@Component({
  selector: 'contacts-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: Contact
  contact$: Observable<Contact>
  contactType: string
  contactLogType = ContactLogType
  settingsMenu = [{
    label: 'Toggle DataView',
    callback: () => this.showDataView = !this.showDataView
  }]

  showDataView = false

  constructor (
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private zone: NgZone
  ) { }

  ngOnInit () {
    this.contact$ = this.route
      .params
      .pipe(
        mergeMap(params => this.contactsService.getContactObservable(params['id'])),
        tap((contact: Contact) => {
          const contacts = [...this.contactsService.openedContacts || []]
          contacts.unshift(contact)
          this.contactsService.openedContacts = contacts.reduce((x, y) => x.includes(y) ? x : [...x, y], [])
        }),
        tap((contact) => this.zone.run(() => {
          this.contactType = contact.tags['person'] ? 'person' : 'company'
        }))
      )
  }
}

