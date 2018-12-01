import { RxCollection } from 'rxdb'
import { Injectable } from '@angular/core'

import * as faker from 'faker'

import { RxDBService } from '@balnc/common'

import { RxPersonDocument } from './models/person'
import { RxCompanyDocument, Company, TaxDetails } from './models/company'
import { RxContactEventDocument } from './models/contact-event'
import { ContactsEntities } from './models/_entities'
import { Resolve } from '@angular/router'

@Injectable()
export class ContactsService implements Resolve<any> {

  persons: RxCollection<RxPersonDocument>
  companies: RxCollection<RxCompanyDocument>
  contactEvents: RxCollection<RxContactEventDocument>

  constructor(
    private dbService: RxDBService
  ) {
  }

  async resolve() {
    console.log("Setup contacts db")
    await this.dbService.setup(ContactsEntities)
    this.persons = await this.dbService.get<RxPersonDocument>('persons')
    this.companies = await this.dbService.get<RxCompanyDocument>('companies')
    this.contactEvents = await this.dbService.get<RxContactEventDocument>('contactEvents')
    console.log("...Setuped contacts db")
  }

  async getLatestCompanies() {
    const companies = await this.companies.find().sort('updatedAt').exec()
    return companies.slice(Math.max(companies.length - 5, 1))
  }

  async getLatestPersons() {
    const persons = await this.persons.find().sort('updatedAt').exec()
    return persons.slice(Math.max(persons.length - 5, 1))
  }

  async getCompanies(params?: any, limit: number = 10) {
    return this.companies.find(params).limit(limit).exec()
  }

  async getCompany(id): Promise<Company> {
    return this.companies.findOne(id).exec()
  }

  async getPerson(id): Promise<Company> {
    return this.persons.findOne(id).exec()
  }

  async addCompany(contact: Company) {
    const result = await this.companies
      .newDocument(contact)
      .save()
    return result
  }

  async generate() {
    for (let c = 0; c < 10; c++) {
      const personIds = []
      for (let p = 0; p < 5; p++) {
        const person = {
          name: `${faker.name.findName()}`,
          avatar: `${faker.image.avatar()}`,
          phones: [faker.phone.phoneNumberFormat()],
          emails: [faker.internet.email()],
          insertedAt: faker.date.past().toISOString(),
          updatedAt: faker.date.past().toISOString()
        } as RxPersonDocument
        const doc = await this.persons.insert(person)
        personIds.push(doc.get('_id'))
      }

      const taxDetails = {
        vatNumber: `VAT${faker.random.number({ min: 1000000000, max: 9999999999 })}`,
        taxOffice: faker.address.city(3),
        address: faker.address.streetAddress(true),
        legalName: '',
        description: ''
      } as TaxDetails

      const company = {
        name: `${faker.company.companyName()}`,
        logo: `${faker.image.avatar()}`,
        persons: personIds,
        taxDetails: taxDetails,
        insertedAt: faker.date.past().toISOString(),
        updatedAt: faker.date.past().toISOString()
      } as RxCompanyDocument

      await this.companies.insert(company)
    }
  }
}
