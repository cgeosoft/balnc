import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../_shared/services/contacts.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  constructor (
    private contactsService: ContactsService
  ) { }

  ngOnInit () {
  }

  get contacts$ () {
    return this.contactsService.contacts$
  }
}
