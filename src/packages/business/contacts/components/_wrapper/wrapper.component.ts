import { Component, OnInit } from '@angular/core'
import { ContactsService } from '../../contacts.service'

import * as _ from 'lodash'

@Component({
  selector: 'contacts-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  companies = []
  persons = []

  constructor (
    private contactsService: ContactsService
  ) { }

  async ngOnInit () {
    await this.load()
  }

  async load () {
    this.companies = await this.contactsService.getLatestCompanies()
    this.persons = await this.contactsService.getLatestPersons()
  }

  async generate () {
    await this.contactsService.generate()
    await this.load()
  }

  async create () {

  }
}
