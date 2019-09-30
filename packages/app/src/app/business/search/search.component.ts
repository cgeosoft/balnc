import { Component, OnInit } from '@angular/core'
import { ContactsService } from '../_shared/services/contacts.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  host: { 'class': 'page' }
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
