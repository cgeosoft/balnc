import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../_shared/services/contacts.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  openedFilters = true

  constructor (
    private contactsService: ContactsService
  ) { }

  ngOnInit () {
  }

  get contacts$ () {
    return this.contactsService.contacts$
  }

}
