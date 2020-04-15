import { Injectable } from '@angular/core'
import { BulkObj, ConfigService } from '@balnc/core'
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
import { BoardsRepo } from './../../boards/@shared/repos/boards.repo'
import { MessagesRepo } from './../../boards/@shared/repos/messages.repo'
import { IssueStatus, IssueType } from './../../projects/@shared/models/all'
import { IssuesRepo } from './../../projects/@shared/repos/issues.repo'
import { ProjectsRepo } from './../../projects/@shared/repos/projects.repo'
import { RxDBService } from './rxdb.service'

const NO_OF_ACCOUNTS = 5
const NO_OF_CUSTOMERS = 500
const NO_OF_AGREEMENTS = 50
const NO_OF_BOARDS = 10
const NO_OF_MESSAGES = 500
const NO_OF_USERS = 7
const NO_OF_PROJECTS = 7
const NO_OF_ISSUES = 250

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
    private boardsRepo: BoardsRepo,
    private messagesRepo: MessagesRepo,
    private agreementsRepo: AgreementsRepo,
    private projectsRepo: ProjectsRepo,
    private issuesRepo: IssuesRepo,
    private dbService: RxDBService,
    private configService: ConfigService
  ) {
  }

  async generate () {
    this.logs$.next('Start demo data generation')
    await this.generateAccounts()
    await this.generateContacts()
    await this.generateAggrements()
    await this.generateBoards()
    await this.generateProjects()
    this.logs$.next(`Generation completed`)
  }

  async clear () {
    this.logs$.next(`Calculate demo data`)

    const q = this.dbService.entities.find()
    const items = await q.exec()
    const demoItems = items.filter(i => i.s && i.s.indexOf('demo') !== -1)

    this.logs$.next(`Found ${demoItems.length} demo data of ${items.length}`)
    const proms = demoItems.map((item, i) => item.remove().then(() => {
      if (i % 500 === 0) this.logs$.next(`Removed ${i} docs`)
    }))

    this.logs$.next(`Remove demo data`)
    await Promise.all(proms)
    this.logs$.next(`Demo data removed`)
  }

  private async generateProjects () {
    this.logs$.next(`Generate ${NO_OF_PROJECTS} projects`)

    const projects: BulkObj[] = []
    for (let b = 0; b < NO_OF_BOARDS; b++) {
      projects.push({
        date: faker.date.past(2).getTime(),
        mark: faker.random.number(100) === 1,
        tags: ['demo'],
        content: {
          name: faker.commerce.productName(),
          description: faker.lorem.paragraph(),
          isArchived: Math.random() > .6,
          features: {}
        }
      })
    }
    this.logs$.next(`Saving ${NO_OF_PROJECTS} projects`)
    await this.projectsRepo.bulk(projects)

    this.logs$.next(`Generate ${NO_OF_ISSUES} issues`)
    const issues: BulkObj[] = []
    const projectSaved = await this.projectsRepo.all()
    const projectIds = projectSaved.map(b => b._id)
    for (let i = 0; i < NO_OF_ISSUES; i++) {
      issues.push({
        date: faker.date.past(2).getTime(),
        tags: ['demo'],
        group: projectIds[faker.random.number(projectIds.length - 1)],
        content: {
          title: faker.hacker.phrase(),
          description: faker.lorem.paragraphs(),
          type: IssueType[IssueType[Math.floor(Math.random() * Object.keys(IssueType).length / 2)]],
          user: this.configService.username,
          status: IssueStatus.pending
        }
      })
    }
    this.logs$.next(`Saving ${NO_OF_ISSUES} issues`)
    await this.issuesRepo.bulk(issues)
  }

  private async generateBoards () {
    this.logs$.next(`Generate ${NO_OF_BOARDS} boards`)
    const boards: BulkObj[] = []
    for (let b = 0; b < NO_OF_BOARDS; b++) {
      boards.push({
        date: faker.date.past(2).getTime(),
        mark: faker.random.number(100) === 1,
        tags: ['demo'],
        content: {
          name: `${faker.hacker.ingverb()} ${faker.hacker.noun()}`
        }
      })
      if (b % 500 === 0) {
        this.logs$.next(`Generate ${b}/${NO_OF_BOARDS} messages`)
      }
    }
    this.logs$.next(`Saving ${NO_OF_BOARDS} boards`)
    await this.boardsRepo.bulk(boards)

    const users = []
    for (let u = 0; u < NO_OF_USERS; u++) {
      users.push(faker.internet.userName())
    }

    const messages: BulkObj[] = []
    const boardSaved = await this.boardsRepo.all()
    const boardIds = boardSaved.map(b => b._id)
    for (let c = 0; c < NO_OF_MESSAGES; c++) {
      messages.push({
        date: faker.date.past(2).getTime(),
        mark: faker.random.number(100) === 1,
        tags: ['demo'],
        group: boardIds[faker.random.number(boardIds.length - 1)],
        content: {
          text: faker.hacker.phrase(),
          sender: users[faker.random.number(users.length - 1)],
          status: 'SEND',
          type: 'MESSAGE'
        }
      })
      if (c % 500 === 0) {
        this.logs$.next(`Generate ${c}/${NO_OF_MESSAGES} messages`)
      }
    }
    this.logs$.next(`Saving ${NO_OF_MESSAGES} messages`)
    await this.messagesRepo.bulk(messages)

    this.logs$.next(`Generation completed`)
  }

  private async generateContacts () {

    this.logs$.next(`Generate 0/${NO_OF_CUSTOMERS} contacts`)
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
      if (p % 500 === 0) {
        this.logs$.next(`Generate ${p}/${NO_OF_CUSTOMERS / 2} contacts/persons`)
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
      if (c % 500 === 0) {
        this.logs$.next(`Generate ${c}/${NO_OF_CUSTOMERS / 2} contacts/companies`)
      }
    }
    this.logs$.next(`Saving ${NO_OF_CUSTOMERS} contacts`)
    await this.contactsRepo.bulk(customers)
  }

  private async generateAccounts () {
    this.logs$.next(`Generate own account`)
    for (let p = 0; p < NO_OF_ACCOUNTS; p++) {
      const own = await this.accountsRepo.add({
        name: `${faker.finance.accountName()}`,
        type: AccountType.Cash
      })
      this.logs$.next(`Add account ${p}`)
      for (let k = 0; k < faker.random.number(5); k++) {
        const funds = faker.random.number({ min: 100, max: 1000, precision: 2 })
        this.logs$.next(`Add funds ${funds}`)
        const t = await this.transactionsRepo.add({
          from: null,
          to: own._id,
          amount: funds,
          executed: Date.now()
        }, null, faker.date.past().getTime())
        await this.executeTransaction(t._id)
      }
    }
  }

  private async generateAggrements () {
    this.logs$.next(`Generate 0/${NO_OF_AGREEMENTS} agreements`)
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
      if (a % 500 === 0) {
        this.logs$.next(`Generate ${a}/${NO_OF_AGREEMENTS} agreements`)
      }
    }
    this.logs$.next(`Saving ${NO_OF_AGREEMENTS} agreements`)
    await this.agreementsRepo.bulk(agreements)
  }

  private async executeTransaction (id: string) {
    this.logs$.next(`execute transaction ${id}`)
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
}
