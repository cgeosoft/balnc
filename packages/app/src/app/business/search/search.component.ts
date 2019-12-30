import { Component } from '@angular/core'
import { ContactsRepo } from '../@shared/repos/contacts.repo'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'

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
