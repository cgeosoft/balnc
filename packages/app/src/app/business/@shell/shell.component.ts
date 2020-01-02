import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { BUSINESS_SIDEBAR } from '../@shared/constants/sidebar'
import { Contact, ContactType } from '../@shared/models/contacts'
import { ContactsRepo } from '../@shared/repos/contacts.repo'

@Component({
  selector: 'app-business-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  contactType = ContactType
  generating = false

  sidebar = BUSINESS_SIDEBAR

  constructor (
    private contactsService: ContactsRepo,
    private router: Router
  ) {
    this.sidebar.search = {
      term: null,
      typeaheadFn: this.typeaheadFn,
      formatter: this.formatter,
      select: this.select
    }
  }

  get typeaheadFn () {
    return (text$: Observable<string>) => text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(async (term) => {
        if (term.length < 2) return [] as Contact[]
        let contacts = await this.contactsService.all()
        return contacts
          .filter(contact => contact.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10)
      })
    )
  }

  get formatter () {
    return (result: Contact) => {
      return result.name
    }
  }

  async select ($event) {
    $event.preventDefault()
    const contact = $event.item as Contact
    this.sidebar.search.term = null
    await this.router.navigate(['/business/contacts', contact._id])
  }
}
