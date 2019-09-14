import { Component } from '@angular/core'
import { ContactType } from '../../_shared/models/contacts'
import { ContactsService } from '../../_shared/services/contacts.service'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  host: { 'class': 'page' }
})
  export class ContactsComponent {

  contactType = ContactType

  constructor (
    private contactsService: ContactsService
  ) { }

  get contacts$ () {
    return this.contactsService.contacts$
  }

}
