import { Component, OnInit } from '@angular/core'
import { ContactsService } from '@blnc/business/contacts/services/contacts.service';
import { RxContactDocument } from '@blnc/business/contacts/data/contact';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-contacts-overview',
  templateUrl: './contacts-overview.component.html',
  styleUrls: ['./contacts-overview.component.scss']
})
export class ContactsOverviewComponent implements OnInit {

  searchTerm: string
  contacts: RxContactDocument[]

  constructor(
    private contactsService: ContactsService,
  ) { }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      // .do(() => this.searching = true)
      .switchMap(term => this.contactsService.getContacts({
        name: {
          $eq: term
        }
      }))


  ngOnInit() {
    this.setup()
  }

  private async setup() {
    await this.loadLatestContacts()
  }

  async loadLatestContacts() {
    this.contacts = await this.contactsService.getContacts()
  }

  async generateMockData() {
    await this.contactsService.generateMock()
    await this.loadLatestContacts()
  }
}
