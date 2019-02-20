import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

import { ContactsService } from '../../_shared/services/contacts.service'
import { Contact } from '../../_shared/models/_all'

@Component({
  selector: 'app-contacts-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  searchTerm: string
  contacts: any[]
  contacts$: Observable<Contact[]>

  constructor(
    private contactsService: ContactsService
  ) { }

  ngOnInit() {
    this.contacts$ = this.contactsService.contacts$
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // .do(() => this.searching = true)
      switchMap(term => this.contactsService.getContacts({
        name: {
          $eq: term
        }
      })))
}
