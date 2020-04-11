import { Injectable } from '@angular/core'
import { BulkObj } from '@balnc/core'
import * as faker from 'faker'
import { Subject } from 'rxjs'
import { AccountType } from '../../accounts/@shared/account'
import { AccountsRepo } from '../../accounts/@shared/accounts.repo'
import { RecordsRepo } from '../../accounts/@shared/records.repo'
import { AgreementStatus } from '../../agreements/@shared/agreement'
import { AgreementsRepo } from '../../agreements/@shared/agreements.repo'
import { ContactType } from '../../contacts/@shared/contacts'
import { ContactsRepo } from '../../contacts/@shared/contacts.repo'
import { TransactionsRepo } from '../../transactions/@shared/transactions.repo'

const NO_OF_ACCOUNTS = 5
const NO_OF_CUSTOMERS = 500
const NO_OF_AGREEMENTS = 100

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  logs$ = new Subject<string>()

  constructor (
    private accountsRepo: AccountsRepo,
    private transactionsRepo: TransactionsRepo,
    private recordsRepo: RecordsRepo,
    private contactsRepo: ContactsRepo,
    private agreementsRepo: AgreementsRepo
  ) {
  }

  async generate () {
    this.message('Start demo data generation')
    await this.generateAccounts()
    await this.generateContacts()
    await this.generateAggrements()
    this.message(`Generation completed`)
  }

  async clear () {
    this.message(`Calculate old demo data`)
    const contacts = await this.contactsRepo.all()
    const contactIds = contacts.filter(o => o._tags && o._tags.indexOf('demo') !== -1).map(c => c._id)
    this.message(`Will remove ${contactIds.length} contacts`)
    const contactsProm = contactIds.map((id, i) => {
      if (i % 100 === 0) {
        this.message(`Removed ${i}/${NO_OF_CUSTOMERS} contacts`)
      }
      return this.contactsRepo.remove(id)
    })
    const agreements = await this.agreementsRepo.all()
    const agreementIds = agreements.filter(o => o._tags && o._tags.indexOf('demo') !== -1).map(a => a._id)
    this.message(`Will remove ${agreementIds.length} agreements`)
    const agreementsProm = agreementIds.map((id, i) => {
      if (i % 100 === 0) {
        this.message(`Removed ${i}/${NO_OF_AGREEMENTS} agreements`)
      }
      return this.agreementsRepo.remove(id)
    })
    this.message(`Remove old demo data`)
    await Promise.all([
      ...contactsProm,
      ...agreementsProm
    ])
    this.message(`Old demo data removed`)
  }

  private async generateContacts () {

    this.message(`Generate 0/${NO_OF_CUSTOMERS} contacts`)
    const customers: BulkObj[] = []
    for (let p = 0; p < NO_OF_CUSTOMERS / 2; p++) {
      customers.push({
        date: faker.date.past(2).getTime(),
        mark: faker.random.number(100) === 1,
        tags: ['demo'],
        content: {
          name: `${faker.name.findName()}`,
          type: ContactType.person,
          avatar: `${faker.image.avatar()}`,
          phones: [faker.phone.phoneNumberFormat()],
          emails: [faker.internet.email()],
          conns: [{
            reference: 'company1',
            type: 'owner'
          }]
        }
      })
      if (p % 100 === 0) {
        this.message(`Generate ${p}/${NO_OF_CUSTOMERS / 2} contacts/persons`)
      }
    }
    for (let c = 0; c < NO_OF_CUSTOMERS / 2; c++) {
      customers.push({
        date: faker.date.past(2).getTime(),
        mark: faker.random.number(100) === 1,
        tags: ['demo'],
        content: {
          name: `${faker.company.companyName()}`,
          type: ContactType.company,
          avatar: `${faker.image.avatar()}`,
          phones: [faker.phone.phoneNumberFormat()],
          emails: [faker.internet.email()],
          taxDetails: {
            vatNumber: `VAT${faker.random.number({ min: 1000000000, max: 9999999999 })}`,
            taxOffice: faker.address.city(3),
            address: faker.address.streetAddress(true),
            legalName: '',
            description: ''
          },
          conns: [{
            reference: 'person1',
            type: 'owner'
          }]
        }
      })
      if (c % 100 === 0) {
        this.message(`Generate ${c}/${NO_OF_CUSTOMERS / 2} contacts/companies`)
      }
    }
    this.message(`Saving ${NO_OF_CUSTOMERS} contacts`)
    await this.contactsRepo.bulk(customers)
  }

  private async generateAccounts () {
    this.message(`Generate own account`)
    for (let p = 0; p < NO_OF_ACCOUNTS; p++) {
      const own = await this.accountsRepo.add({
        name: `${faker.finance.accountName()}`,
        type: AccountType.Cash
      })
      this.message(`Add account ${p}`)
      for (let k = 0; k < faker.random.number(5); k++) {
        const funds = faker.random.number({ min: 100, max: 1000, precision: 2 })
        this.message(`Add funds ${funds}`)
        const t = await this.transactionsRepo.add({
          from: null,
          to: own._id,
          amount: funds,
          executed: Date.now()
        }, null, faker.date.past().getTime())
        await this.execute(t._id)
      }
    }
  }

  private async generateAggrements () {
    this.message(`Generate 0/${NO_OF_AGREEMENTS} agreements`)
    const contacts = await this.contactsRepo.all()
    const agreements: BulkObj[] = []
    for (let a = 0; a < NO_OF_AGREEMENTS; a++) {
      const contact = contacts[faker.random.number({ min: 0, max: contacts.length - 1 })]
      agreements.push({
        date: faker.date.past(1).getTime(),
        group: contact._id,
        tags: ['demo'],
        content: {
          contact: contact._id,
          status: AgreementStatus.draft,
          content: `# Agreement ${Date.now()}\n\r${faker.lorem.paragraphs(5)}`
        }
      })
      if (a % 100 === 0) {
        this.message(`Generate ${a}/${NO_OF_AGREEMENTS} agreements`)
      }
    }
    this.message(`Saving ${NO_OF_AGREEMENTS} agreements`)
    await this.agreementsRepo.bulk(agreements)
  }

  private async execute (id: string) {
    this.message(`execute transaction ${id}`)
    const t = await this.transactionsRepo.one(id)
    if (!t) return

    if (t.from) {
      await this.recordsRepo.add({
        transaction: t._id,
        account: t.from,
        amount: t.amount * -1
      })
    }

    if (t.to) {
      await this.recordsRepo.add({
        transaction: t._id,
        account: t.to,
        amount: t.amount
      })
    }
  }

  private message (message) {
    this.logs$.next(`[Business] ${message}`)
  }
}
