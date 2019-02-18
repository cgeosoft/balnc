import { Component, OnInit, NgZone } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { ContactsService } from '../../contacts.service'
import { Contact, ContactLogType } from '../../models/all.model'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(async params => {
        // console.log(params['id'])
        this.contact$ = this.contactsService.getContactObservable(params['id']).pipe(
          tap((c) => console.log(c)),
          tap((c) => this.zone.run(() => { })),
          // tap((c) => console.log(c)),
        )
        this.contactType = 'person'
        // this.contactType = this.contact.tags.includes('company') ? 'company' : 'person'
      })
  }

}
