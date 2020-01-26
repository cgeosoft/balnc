import { Injector, NgZone } from '@angular/core'
import { RxAttachment, RxCollection } from 'rxdb'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { BulkObj, DbEntity } from '../rxdb/models/entity'
import { RxDBService } from '../rxdb/rxdb.service'
import { QueryParams } from './query-params'
import { RepositoryHelpers } from './repository.helpers'

export class Repository<T> {

  entity = null
  observables: { [key: string]: Observable<any> } = {}
  entities: RxCollection

  private dbService: RxDBService
  private zone: NgZone
  private defaultQueryParams: QueryParams = {
    group: null, mark: null
  }

  constructor(
    private injector: Injector
  ) {
    this.dbService = this.injector.get(RxDBService)
    this.zone = this.injector.get(NgZone)
  }

  async warm() {
    console.log(`warming repo ${this.entity}`)
    if (!this.dbService.db) {
      console.log(`warming aborded: no db was found`)
      return
    }
    const warmingTs = Date.now()
    this.entities = this.dbService.db.entities
    await this.entities.find()
      .where('t')
      .eq(this.entity)
      .exec()
    console.log(`   warmed in ${Date.now() - warmingTs}ms`)
  }

  async all(params?: QueryParams): Promise<T[]> {
    const p: QueryParams = { ...this.defaultQueryParams, ...params }
    let q = this.entities.find()
      .where('t')
      .eq(this.entity)
    if (p.group) {
      q = q.where('g').eq(p.group)
    }
    if (p.mark != null) {
      q = q.where('m').eq(p.mark)
    }
    const items = await q.exec()
    return this.mappedItems(items)
  }

  all$(params?: QueryParams): Observable<(T | any)[]> {
    const p: QueryParams = { ...this.defaultQueryParams, ...params }
    let q = this.entities.find().where('t').eq(this.entity)
    if (p.group) {
      q = q.where('g').eq(p.group)
    }
    if (p.mark != null) {
      q = q.where('m').eq(p.mark)
    }
    return q.$
    // .pipe(
    //   map((items) => this.mappedItems(items)),
    //   tap((items) => {
    //     this.zone.run(() => {
    //       // empty run for ui update
    //     })
    //   })
    // )
  }

  async one(id: string): Promise<T> {
    const item = await this.entities.findOne(id).exec()
    if (!item) return null
    return this.mappedItems([item])[0]
  }

  one$(id: string): Observable<T> {
    return this.entities.findOne(id).$.pipe(
      map((item) => this.mappedItems([item])[0]),
      tap(() => {
        this.zone.run(() => {
          // empty run for ui update
        })
      })
    )
  }

  async add(data: Partial<T>, group?: string, ts?: number, tags?: string[]): Promise<T> {
    const obj = {
      c: data,
      t: this.entity,
      d: ts || Date.now(),
      s: tags,
      g: group || ''
    }
    const doc = await this.entities.insert(obj)
    return this.mappedItems([doc])[0]
  }

  async bulk(data: BulkObj[]) {
    const objs = data
      .map((o) => {
        return {
          d: o.date || Date.now(),
          t: this.entity,
          g: o.group || '',
          m: o.mark,
          s: o.tags,
          c: o.content
        } as DbEntity
      })
    return this.entities.bulkInsert(objs)
  }

  async update(id: string, data: any) {
    const item = await this.entities.findOne(id).exec()
    const content = { ...item.c, ...data }

    const filteredContent = Object.keys(content)
      .filter(key => !key.startsWith('_'))
      .reduce((obj, key) => {
        obj[key] = content[key]
        return obj
      }, {})

    await item.update({
      $set: {
        c: filteredContent
      }
    })
  }

  async mark(id: string): Promise<T> {
    const item = await this.entities.findOne(id).exec()
    if (!item) return null
    const mark = !item.m
    await item.update({
      $set: {
        m: mark
      }
    })
  }

  async remove(id: string): Promise<void> {
    const obj = await this.entities.findOne(id).exec()
    await obj.remove()
  }

  async upload(id: string, file: File) {
    const obj = await this.entities.findOne(id).exec()
    await obj.putAttachment({
      id: file.name,
      data: file.slice(),
      type: file.type
    })
  }

  async getAttachment(id: string, file: string): Promise<RxAttachment<T>> {
    const obj = await this.entities.findOne(id).exec()
    const attachment = obj.getAttachment(file)
    return attachment
  }

  private mappedItems(items) {
    const r = items
      .filter(i => i && i._id)
      .map((i: DbEntity) => RepositoryHelpers.mapEntity(i))
    return r
  }
}
