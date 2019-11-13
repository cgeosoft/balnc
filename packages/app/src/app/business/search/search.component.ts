import { Component } from '@angular/core'
import { ContactsRepo } from '../_shared/repos/contacts.repo'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  host: { 'class': 'page' }
})
export class SearchComponent {

  openedFilters = true

  constructor (
    private contactsService: ContactsRepo
  ) { }

  get contacts$ () {
    return this.contactsService.all$()
  }
}
