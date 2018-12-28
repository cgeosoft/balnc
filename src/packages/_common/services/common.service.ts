import { Resolve } from '@angular/router'
import { RxDBService } from '@balnc/common'
import * as faker from 'faker'
import { RxDatabase, RxDocument } from 'rxdb'
import { Observable, Subject } from 'rxjs'
import { Entity } from '../rxdb/entity'

export class CommonService implements Resolve<any> {

  alias: string
  entities: Entity[]
  observables: Observable<any>[]
  db: RxDatabase

  constructor (private dbService: RxDBService) { }

  setup (
    alias: string,
    entities: Entity[]
  ) {
    this.alias = alias
    this.entities = entities
  }

  async resolve () {
    if (!this.db) {
      console.log(`Setup ${this.alias} db`)
      this.db = await this.dbService.setup(this.entities)
      this.entities.forEach(entity => {
        this.observables[`${entity.name}$`] = this.db[entity.name].find().$
      })
      console.log(`...Setuped ${this.alias} `)
    }

    this.entities.forEach(entity => {
      this.observables[`${entity.name}$`]
        .subscribe(o => {
          // o.sort((ca, cb) => {
          //   const caLastUpdate = new Date(ca.logs[ca.logs.length - 1].date)
          //   const cbLastUpdate = new Date(cb.logs[cb.logs.length - 1].date)
          //   return cbLastUpdate.getTime() - caLastUpdate.getTime()
          // })
          // this.lastAccessed$.next(o.slice(0, 10))
        })
    })
  }

  async getAll<T> (entity: string, params): Promise<T[]> {
    return this.db[entity].find(params).exec()
  }

  async getOne<T> (entity: string, id): Promise<RxDocument<T> & T> {
    const obj = await this.db[entity].findOne(id).exec()
    if (!obj) return null

    // obj.atomicUpdate(c => {
    //   c.logs.push({
    //     date: new Date(),
    //     type: ContactLogType.Access
    //   })
    //   return c
    // })

    // await obj.save()

    return obj
  }

  async addOne<T> (entity: string, obj: T) {
    const result = await this.db[entity]
      .newDocument(obj)
      .save()
    return result
  }

  // async generate () {
  //   const cs: Contact[] = []

  //   for (let p = 0; p < 5; p++) {
  //     const person: Contact & any = {
  //       name: `${faker.name.findName()}`,
  //       tags: ['person'],
  //       details: {
  //         avatar: `${faker.image.avatar()}`,
  //         phones: [faker.phone.phoneNumberFormat()],
  //         emails: [faker.internet.email()]
  //       },
  //       conns: [{
  //         reference: 'company1',
  //         type: 'owner'
  //       }],
  //       logs: [{
  //         date: new Date(),
  //         type: ContactLogType.Create
  //       }, {
  //         date: new Date(),
  //         type: ContactLogType.AddConnection,
  //         reference: 'company1'
  //       }]
  //     }
  //     cs.push(person)
  //   }

  //   for (let c = 0; c < 10; c++) {

  //     const company: Contact & any = {
  //       name: `${faker.company.companyName()}`,
  //       tags: ['company'],
  //       details: {
  //         avatar: `${faker.image.avatar()}`,
  //         taxDetails: {
  //           vatNumber: `VAT${faker.random.number({ min: 1000000000, max: 9999999999 })}`,
  //           taxOffice: faker.address.city(3),
  //           address: faker.address.streetAddress(true),
  //           legalName: '',
  //           description: ''
  //         }
  //       },
  //       conns: [{
  //         reference: 'person1',
  //         type: 'owner'
  //       }],
  //       logs: [{
  //         date: new Date(),
  //         type: ContactLogType.Create
  //       }, {
  //         date: new Date(),
  //         type: ContactLogType.AddConnection,
  //         reference: 'person1'
  //       }]
  //     }
  //     cs.push(company)
  //   }

  //   cs.forEach((v: RxContactDocument) => {
  //     this.db['contacts'].insert(v)
  //   })
  // }
}
