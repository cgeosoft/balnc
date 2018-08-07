import { Subject, Observable } from 'rxjs'
import { RxCollection, RxReplicationState, RxDocumentBase } from 'rxdb'
import { Injectable, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'

import * as faker from 'faker'

import { Entity, DatabaseService } from '@balnc/common'
import { RxPersonDocument } from './models/person'
import { RxCompanyDocument, Company } from './models/company'
import { RxContactEventDocument } from './models/contact-event'

@Injectable()
export class ContactsService {

  persons: RxCollection<RxPersonDocument>
  companies: RxCollection<RxCompanyDocument>
  contactEvents: RxCollection<RxContactEventDocument>

  constructor (
    private dbService: DatabaseService
  ) {
    this.setup()
  }

  async setup () {
    this.persons = await this.dbService.get<RxPersonDocument>('persons')
    this.companies = await this.dbService.get<RxCompanyDocument>('companies')
    this.contactEvents = await this.dbService.get<RxContactEventDocument>('contactEvents')
  }

  async getContacts (params?: any) {
    const contacts = await this.companies
      .find(params)
      .limit(50)
      .exec()

    return contacts
  }

  async getContact (contactId): Promise<Company> {
    return this.companies.findOne(contactId).exec()
  }

  async addContact (contact: Company) {
    const result = await this.companies
      .newDocument(contact)
      .save()
    return result
  }

  // async generateMock () {
  //   for (let i = 0; i < 10000; i++) {
  //     await this.companies.insert({
  //       name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  //       address: `${faker.address.streetAddress(true)} ${faker.address.zipCode()}, ${faker.address.country()}`,
  //       email: `${faker.internet.exampleEmail()}`,
  //       phone: `${faker.phone.phoneNumber()}`,
  //       details: {},
  //       subContacts: []
  //     } as RxContactDocument)
  //   }
  // }

  // async clearMock () {

  // }
}
