import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { ContactsService } from '../../contacts.service'
import { Person } from '../../models/person'

@Component({
  selector: 'contacts-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent implements OnInit {

  person: Person

  constructor (
    private route: ActivatedRoute,
    private contactsService: ContactsService
  ) { }

  ngOnInit () {
    this.route
      .params
      .subscribe(async params => {
        this.person = await this.contactsService.getPerson(params['id'])
      })
  }
}
