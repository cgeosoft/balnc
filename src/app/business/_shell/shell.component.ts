import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ContactCreateComponent } from '../contact-create/contact-create.component';
import { Contact } from '../_shared/models/_all';
import { ContactsService } from '../_shared/services/contacts.service';

@Component({
  selector: 'business-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent {

  generating = false
  term: string

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
    await this.router.navigate(['/business/contact', contact['_id']])
  }

  async closeAll () {
    this.contactsService.openedContacts = []
    await this.router.navigate(['/business/overview'])
  }

  get search () {
    return (text$: Observable<string>) => text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(async (term) => {
        if (term.length < 2) return [] as Contact[]
        let contacts = await this.contactsService.getAll<Contact>('contacts', {})
        return contacts.filter(contact => contact.name.toLowerCase()
          .indexOf(term.toLowerCase()) > -1).slice(0, 10)
      })
    )
  }

  get formatter () {
    return (result: Contact) => {
      return result.name
    }
  }

  select ($event) {
    $event.preventDefault()
    const contact = $event.item as Contact
    this.term = ''
    this.router.navigate(['/business/contact', contact['_id']])
  }
}
