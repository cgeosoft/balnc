import { Component, OnInit } from '@angular/core'

import { ContactsService } from '../../contacts.service'
import { Contact } from '../../models/all.model'
import { Observable, generate } from 'rxjs'

@Component({
  selector: 'contacts-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  lastAccessed$: Observable<Contact[]>
  generating = false

  constructor (
    private contactsService: ContactsService
  ) { }

  async ngOnInit () {
    this.lastAccessed$ = this.contactsService.lastAccessed$
  }

  async generate () {
    this.generating = true
    if (confirm('Are you sure?')) {
      await this.contactsService.generateDemoData()
    }
    this.generating = false
  }

  async create () {
    // todo
  }
}
