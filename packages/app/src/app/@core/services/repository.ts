import { Injector, NgZone } from '@angular/core'
import { RxAttachment, RxCollection } from 'rxdb'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { BulkObj, DbEntity } from '../models/entity'
import { QueryParams } from '../models/query-params'
import { RepositoryHelpers } from './repository.helpers'
import { RxDBService } from './rxdb.service'

export class Repository<T> {

  entity = null
  observables: { [key: string]: Observable<any> } = {}
  entities: RxCollection

  private defaultQueryParams: QueryParams = {
    group: null, mark: null
  }

  protected dbService
  zone

  constructor (
    private injector: Injector
  ) {
    this.dbService = this.injector.get(RxDBService)
    this.zone = this.injector.get(NgZone)
  }

  async all (params?: QueryParams): Promise<T[]> {
    const p: QueryParams = { ...this.defaultQueryParams, ...params }
    let q = this.dbService.entities.find()
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

  all$ (params?: QueryParams): Observable<(T | any)[]> {
    const p: QueryParams = { ...this.defaultQueryParams, ...params }
    let q = this.dbService.entities.find().where('t').eq(this.entity)
    if (p.group) {
      q = q.where('g').eq(p.group)
    }
    if (p.mark != null) {
      q = q.where('m').eq(p.mark)
    }
    return q.$
  }

  allm$ (params?: QueryParams): Observable<(T | any)[]> {
    return this.all$(params)
      .pipe(
        map((items) => this.mappedItems(items))
      )
  }

  async one (id: string): Promise<T> {
    const item = await this.dbService.entities.findOne(id).exec()
    if (!item) return null
    return this.mappedItems([item])[0]
  }

  one$ (id: string): Observable<T> {
    return this.dbService.entities.findOne(id).$.pipe(
      map((item) => this.mappedItems([item])[0]),
      tap(() => {
        this.zone.run(() => {
          // empty run for ui update
        })
      })
    )
  }

  async add (data: Partial<T>, group?: string, ts?: number, tags?: string[]): Promise<T> {
    const obj = {
      c: data,
      t: this.entity,
      d: ts || Date.now(),
      s: tags,
      g: group || ''
    }
    const doc = await this.dbService.entities.insert(obj)
    return this.mappedItems([doc])[0]
  }

  async bulk (data: BulkObj[]) {
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
    return this.dbService.entities.bulkInsert(objs)
  }

  async update (id: string, data: any, group?: string) {
    const item = await this.dbService.entities.findOne(id).exec()
    const content = { ...item.c, ...data }

    const filteredContent = Object.keys(content)
      .filter(key => !key.startsWith('_'))
      .reduce((obj, key) => {
        obj[key] = content[key]
        return obj
      }, {})

    await item.update({
      $set: {
        c: filteredContent,
        g: group || item.g
      }
    })
  }

  async mark (id: string): Promise<T> {
    const item = await this.dbService.entities.findOne(id).exec()
    if (!item) return null
    const mark = !item.m
    await item.update({
      $set: {
        m: mark
      }
    })
  }

  async remove (id: string): Promise<void> {
    const obj = await this.dbService.entities.findOne(id).exec()
    await obj.remove()
  }

  async attach (id: string, file: File, filename?: string) {
    const obj = await this.dbService.entities.findOne(id).exec()
    const d = {
      id: filename || file.name,
      data: file.slice(),
      type: file.type
    }
    await obj.putAttachment(d)
  }

  async detach (id: string, file: string) {
    const attachment = await this.getAttachment(id, file)
    await attachment.remove()
  }

  async getAttachment (id: string, file: string): Promise<RxAttachment<T>> {
    const obj = await this.dbService.entities.findOne(id).exec()
    const attachment = obj.getAttachment(file)
    return attachment
  }

  private mappedItems (items) {
    if (!items) return []
    const r = items
      .filter(i => i && i._id)
      .map((i: DbEntity) => RepositoryHelpers.mapEntity(i))
    return r
  }
}
