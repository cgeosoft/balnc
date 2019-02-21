import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../_shared/models/_all';
import { ContactsService } from '../_shared/services/contacts.service';

@Component({
  selector: 'business-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {

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
