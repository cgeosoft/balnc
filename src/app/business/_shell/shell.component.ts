import { Component } from '@angular/core';
import { ContactsService } from '../_shared/services/contacts.service';

@Component({
  selector: 'business-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent {

  generating = false

  constructor (
    private contactsService: ContactsService
  ) { }

  get opened () {
    return this.contactsService.openedContacts
  }

  async create () {
    // todo
  }
}
