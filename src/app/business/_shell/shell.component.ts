import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactCreateComponent } from '../contact-create/contact-create.component';
import { Contact } from '../_shared/models/_all';
import { ContactsService } from '../_shared/services/contacts.service';

@Component({
  selector: 'business-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent {

  generating = false

  constructor (
    private contactsService: ContactsService,
    private router: Router,
    private modal: NgbModal
  ) { }

  get opened () {
    return this.contactsService.openedContacts
  }

  async create () {
    const contact: Contact = await this.modal.open(ContactCreateComponent).result
    await this.router.navigate(['/business/contact',contact['_id']])
  }

  async closeAll () {
    this.contactsService.openedContacts = []
    await this.router.navigate(['/business/overview'])
  }
}
