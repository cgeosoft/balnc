import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

import { ContactsService } from '../../contacts.service'
import { Contact } from '../../models/all.model'

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

  ngOnInit() {
    this.contacts$ = this.contactsService.contacts$
  }
}
