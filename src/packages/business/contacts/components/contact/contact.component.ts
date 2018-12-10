import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { ContactsService } from '../../contacts.service'
import { Contact } from '../../models/contact'

@Component({
  selector: 'contacts-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: Contact
  contactType: string

  constructor (
    private route: ActivatedRoute,
    private contactsService: ContactsService
  ) { }

  ngOnInit () {
    this.route
      .params
      .subscribe(async params => {
        console.log(params['id'])
        this.contact = await this.contactsService.getContact(params['id'])
        this.contactType = this.contact.tags.includes('company') ? 'company' : 'person'
      })
  }
}
