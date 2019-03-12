import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@balnc/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ContactCreateComponent } from '../contact-create/contact-create.component';
import { Contact, ContactType } from '../_shared/models/contacts';
import { ContactsService } from '../_shared/services/contacts.service';
import { StateService } from '../_shared/services/state.service';

@Component({
  selector: 'app-business-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  contactType = ContactType

  generating = false
  term: string

  constructor(
    private stateService: StateService,
    private contactsService: ContactsService,
    private router: Router,
    private modal: NgbModal,
    private configService: ConfigService
  ) { }

  get opened() {
    return this.stateService.opened[this.configService.selected]
  }

  async create() {
    const contact: Contact = await this.modal.open(ContactCreateComponent).result
    await this.router.navigate(['/business/contacts', contact['_id']])
  }

  async closeAll() {
    this.stateService.closeAll()
    await this.router.navigate(['/business'])
  }

  async close(index, $event) {
    this.stateService.close(index)
    $event.preventDefault()
  }

  get search() {
    return (text$: Observable<string>) => text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(async (term) => {
        if (term.length < 2) return [] as Contact[]
        let contacts = await this.contactsService.getAll<Contact>('contacts', {})
        return contacts
          .filter(contact => contact.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10)
      })
    )
  }

  get formatter() {
    return (result: Contact) => {
      return result.name
    }
  }

  async select($event) {
    $event.preventDefault()
    const contact = $event.item as Contact
    this.term = ''
    await this.router.navigate(['/business/contacts', contact['_id']])
  }
}
