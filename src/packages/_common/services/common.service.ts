import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { RxDatabase, RxDocument } from 'rxdb'
import { Observable } from 'rxjs'

import { Entity } from '../rxdb/entity'
import { RxDBService } from '../rxdb/rxdb.service'

@Injectable()
export class CommonService implements Resolve<any> {

  alias: string
  entities: Entity[]
  observables: { [key: string]: Observable<any>} = {}
  db: RxDatabase

  constructor (
    private dbService: RxDBService
  ) { }

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

    // this.entities.forEach(entity => {
    //   this.observables[`${entity.name}$`]
    //     .subscribe(o => {
    //       // o.sort((ca, cb) => {
    //       //   const caLastUpdate = new Date(ca.logs[ca.logs.length - 1].date)
    //       //   const cbLastUpdate = new Date(cb.logs[cb.logs.length - 1].date)
    //       //   return cbLastUpdate.getTime() - caLastUpdate.getTime()
    //       // })
    //       // this.lastAccessed$.next(o.slice(0, 10))
    //     })
    // })
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
}
