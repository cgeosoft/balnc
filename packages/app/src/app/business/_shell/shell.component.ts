import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { Contact, ContactType } from '../_shared/models/contacts'
import { ContactsRepo } from '../_shared/repos/contacts.repo'
import { DemoService } from '../_shared/services/demo.service'

@Component({
  selector: 'app-business-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  host: { 'class': 'shell' }
})
export class ShellComponent implements OnInit {

  contactType = ContactType

  generating = false
  term: string

  constructor(
    private demoService: DemoService,
    private contactsService: ContactsRepo,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.demoService.generate()
  }

  get search() {
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

  get formatter() {
    return (result: Contact) => {
      return result.name
    }
  }

  async select($event) {
    $event.preventDefault()
    const contact = $event.item as Contact
    this.term = ''
    await this.router.navigate(['/business/contacts', contact._id])
  }
}
