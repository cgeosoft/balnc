import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Agreement } from '../../_shared/models/agreement';
import { Contact } from '../../_shared/models/contacts';
import { AgreementsService } from '../../_shared/services/agreements.service';
import { ContactsService } from '../../_shared/services/contacts.service';

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
})
export class AgreementsComponent implements OnInit {
  agreements$: Observable<Agreement[]>;
  contacts: Contact[];

  constructor(
    private agreementsService: AgreementsService,
    private contactsService: ContactsService,
  ) { }

  async ngOnInit() {
    this.contacts = await this.contactsService.getAll<Contact>("contacts")
    this.agreements$ = this.agreementsService.getAll$<Agreement>("agreements")
  }

  getContact(contactId) {
    return this.contacts.find(c => c["_id"] === contactId)
  }
}
