import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators'
import { BUSINESS_SIDEBAR_MENU } from '../@shared/constants/sidebar'
import { Contact, ContactType } from '../@shared/models/contacts'
import { ContactsRepo } from '../@shared/repos/contacts.repo'

@Component({
  selector: 'app-business-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  contactType = ContactType
  generating = false

  term: string
  marked$: Observable<{ label: string; icon: string[]; url: string[] }[]>
  menu = BUSINESS_SIDEBAR_MENU

  constructor (
    private contactsService: ContactsRepo,
    private router: Router
  ) { }

  ngOnInit () {
    this.marked$ = this.contactsService
      .all$({ mark: true })
      .pipe(
        take(15),
        map((data) => {
          return data.map(item => {
            return {
              label: item.c.name,
              icon: ['fas', (item.c.type === ContactType.person) ? 'user-circle' : 'building'],
              url: ['/business/contacts', item._id],
              type: 'button'
            }
          })
        })
      )
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
    this.term = null
    await this.router.navigate(['/business/contacts', contact._id])
  }
}
