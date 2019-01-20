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
  observables: { [key: string]: Observable<any> } = {}

  db: RxDatabase

  constructor (private dbService: RxDBService) { }

  async resolve () {
    if (!this.db) {
      console.log(`Setup ${this.alias} db`)
      this.db = await this.dbService.setup(this.alias, this.entities)
      this.entities.forEach(entity => {
        this.observables[`${entity.name}$`] = this.db[entity.name].find().$
      })
      console.log(`...Setuped ${this.alias} `)
    }
  }

  async getAll<T> (entity: string, params): Promise<T[]> {
    return this.db[entity].find(params).exec()
  }

  async getOne<T> (entity: string, id): Promise<RxDocument<T> & T> {
    const obj = await this.db[entity].findOne(id).exec()
    if (!obj) return null
    return obj
  }

  async addOne<T> (entity: string, obj: T): Promise<RxDocument<T> & T> {
    let doc = this.db[entity].newDocument(obj)
    await doc.save()
    return doc
  }
}
