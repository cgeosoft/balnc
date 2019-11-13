import { Injectable } from '@angular/core'
import * as faker from 'faker'
import { AccountType } from '../models/account'
import { AgreementStatus } from '../models/agreement'
import { ContactType } from '../models/contacts'
import { AccountsRepo } from '../repos/accounts.repo'
import { AgreementsRepo } from '../repos/agreements.repo'
import { CEventsRepo } from '../repos/cevents.repo'
import { ContactsRepo } from '../repos/contacts.repo'
import { RecordsRepo } from '../repos/records.repo'
import { TransactionsRepo } from '../repos/transactions.repo'

@Injectable()
export class DemoService {

  generated = false

  constructor (
    private accountsRepo: AccountsRepo,
    private transactionsRepo: TransactionsRepo,
    private recordsRepo: RecordsRepo,
    private ceventsRepo: CEventsRepo,
    private contactsRepo: ContactsRepo,
    private agreementsRepo: AgreementsRepo
  ) { }

  async execute (id: string) {
    console.log(`execute transaction ${id}`)
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

  async generate () {

    const NO_OF_ACCOUNTS = 5
    const NO_OF_CUSTOMERS = 20

    console.log(`Generate Own Account`)

    console.log(Object.keys(AccountType))
    for (let p = 0; p < NO_OF_ACCOUNTS; p++) {
      const own = await this.accountsRepo.add({
        name: `${faker.finance.accountName()}`,
        type: AccountType.Cash
      })
      console.log(`add account ${p}`)

      for (let k = 0; k < faker.random.number(5); k++) {
        const funds = faker.random.number({ min: 100, max: 1000, precision: 2 })
        console.log(`add funds ${funds}`)

        const t = await this.transactionsRepo.add({
          from: null,
          to: own._id,
          amount: funds,
          executed: Date.now()
        }, faker.date.past().getTime())

        await this.execute(t._id)
      }
    }

    if (this.generated) return

    console.log(`generate ${NO_OF_CUSTOMERS / 2} person/contacts`)
    for (let p = 0; p < NO_OF_CUSTOMERS / 2; p++) {
      await this.contactsRepo.add({
        name: `${faker.name.findName()}`,
        type: ContactType.person,
        tags: [],
        details: {
          avatar: `${faker.image.avatar()}`,
          phones: [faker.phone.phoneNumberFormat()],
          emails: [faker.internet.email()]
        },
        conns: [{
          reference: 'company1',
          type: 'owner'
        }]
      })
      console.log(`add person ${p}`)
    }

    console.log(`generate ${NO_OF_CUSTOMERS / 2} company/contacts`)
    for (let c = 0; c < NO_OF_CUSTOMERS / 2; c++) {
      await this.contactsRepo.add({
        name: `${faker.company.companyName()}`,
        type: ContactType.company,
        tags: [],
        details: {
          avatar: `${faker.image.avatar()}`,
          phones: [faker.phone.phoneNumberFormat()],
          emails: [faker.internet.email()],
          taxDetails: {
            vatNumber: `VAT${faker.random.number({ min: 1000000000, max: 9999999999 })}`,
            taxOffice: faker.address.city(3),
            address: faker.address.streetAddress(true),
            legalName: '',
            description: ''
          }
        },
        conns: [{
          reference: 'person1',
          type: 'owner'
        }]
      })
      console.log(`add company ${c}`)
    }

    console.log(`generate ${NO_OF_CUSTOMERS} agreements`)
    const contacts = await this.contactsRepo.all()

    for (let a = 0; a < NO_OF_CUSTOMERS; a++) {
      const contact = contacts[faker.random.number({ min: 0, max: contacts.length - 1 })]
      await this.agreementsRepo.add({
        contact: contact._id,
        status: AgreementStatus.draft,
        content: `# Agreement ${Date.now()}\n\r${faker.lorem.paragraphs(5)}`
      })
      console.log(`add agreement to contact ${contact._id}`)
    }

    this.generated = true
  }

}
