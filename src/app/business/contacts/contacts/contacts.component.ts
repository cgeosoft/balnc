import { Component, OnInit } from '@angular/core';
import { ContactType } from '../../_shared/models/contacts';
import { ContactsService } from '../../_shared/services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit {

  contactType = ContactType

  constructor(
    private contactsService: ContactsService
  ) { }

  ngOnInit() {

  }

  get contacts$() {
    return this.contactsService.contacts$
  }

}
