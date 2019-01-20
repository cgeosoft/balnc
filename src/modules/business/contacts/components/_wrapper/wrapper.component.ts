import { Component, OnInit } from '@angular/core'

import { ContactsService } from '../../contacts.service'
import { Contact } from '../../models/all.model'
import { Observable } from 'rxjs'

@Component({
  selector: 'contacts-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  lastAccessed$: Observable<Contact[]>

  constructor (
    private contactsService: ContactsService
  ) { }

  async ngOnInit () {
    this.lastAccessed$ = this.contactsService.lastAccessed$
  }

  async generate () {
    await this.contactsService.generateDemoData()
  }

  async create () {
    // todo
  }
}
