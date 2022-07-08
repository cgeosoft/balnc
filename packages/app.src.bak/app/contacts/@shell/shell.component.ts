import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MenuItem } from '@balnc/shared'
import { Observable } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators'
import { Contact, ContactType } from '../@shared/contacts'
import { ContactsRepo } from '../@shared/contacts.repo'

@Component({
  selector: 'app-contacts-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  contactType = ContactType
  generating = false

  term: string
  marked$: Observable<MenuItem[]>
  menu: MenuItem[] = [{
    label: 'Overview',
    type: 'button',
    icon: 'border-all',
    route: ['/contacts/overview']
  }, {
    label: 'Calendar',
    type: 'button',
    icon: 'calendar-alt',
    route: ['/contacts/calendar']
  }]

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
          return data.map<MenuItem>(item => {
            return {
              label: item.c.name,
              icon: ['fas', (item.c.type === ContactType.person) ? 'user-circle' : 'building'],
              route: ['/contacts/contact', item.id],
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
    await this.router.navigate(['/business/contacts', contact.id])
  }
}
