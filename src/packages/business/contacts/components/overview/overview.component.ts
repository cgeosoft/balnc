import { switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ContactsService } from '../../contacts.service'

@Component({
  selector: 'app-contacts-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  searchTerm: string
  contacts: any[]

  constructor (
    private contactsService: ContactsService
  ) { }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // .do(() => this.searching = true)
      switchMap(term => this.contactsService.getCompanies({
        name: {
          $eq: term
        }
      })))

  ngOnInit () {
    this.load()
  }

  private async load () {
    await this.loadLatestContacts()
  }

  async loadLatestContacts () {
    this.contacts = await this.contactsService.getCompanies()
  }
}
