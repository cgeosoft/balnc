import { Injector, NgZone } from '@angular/core'
import { RxAttachment, RxCollection } from 'rxdb'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Entity } from './models/entity'
import { RxDBService } from './rxdb.service'

export class Repository<T> {

  entity = null
  observables: { [key: string]: Observable<any> } = {}
  entities: RxCollection

  private dbService: RxDBService
  private zone: NgZone

  constructor (
    private injector: Injector
  ) {
    this.dbService = this.injector.get(RxDBService)
    this.zone = this.injector.get(NgZone)
    this.entities = this.dbService.db.entities
  }

  async all (group?: string, mark: boolean = false): Promise<T[]> {
    let q = this.entities.find().where('t').eq(this.entity)
    if (group) {
      q = q.where('g').eq(group)
    }
    if (mark) {
      q = q.where('m').eq(mark)
    }
    const items = await q.exec()
    return this.mappedItems(items)
  }

  all$ (group?: string, mark: boolean = false): Observable<T[]> {
    let q = this.entities.find().where('t').eq(this.entity)
    if (group) {
      q = q.where('g').eq(group)
    }
    if (mark) {
      q = q.where('m').eq(mark)
    }
    return q.$.pipe(
      map((items) => this.mappedItems(items)),
      tap(() => {
        this.zone.run(() => {
          // empty run for ui update
        })
      })
    )
  }

  async one (id: string): Promise<T> {
    const item = await this.entities.findOne(id).exec()
    if (!item) return null
    return this.mappedItems([item])[0]
  }

  one$ (id: string): Observable<T> {
    return this.entities.findOne(id).$.pipe(
      map((item) => this.mappedItems([item])[0]),
      tap(() => {
        this.zone.run(() => {
          // empty run for ui update
        })
      })
    )
  }

  async add (data: Partial<T>, group?: string, ts?: number): Promise<T> {
    const obj = {
      c: data,
      t: this.entity,
      d: ts || Date.now(),
      g: group
    }
    const doc = await this.entities.insert(obj)
    return this.mappedItems([doc])[0]
  }

  async update (id: string, data: any) {
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

  async mark (id: string): Promise<T> {
    const item = await this.entities.findOne(id).exec()
    if (!item) return null
    const mark = !item.m
    await item.update({
      $set: {
        m: mark
      }
    })
  }

  async remove (id: string): Promise<void> {
    const obj = await this.entities.findOne(id).exec()
    await obj.remove()
  }

  async upload (id: string, file: File) {
    const obj = await this.entities.findOne(id).exec()
    await obj.putAttachment({
      id: file.name,
      data: file.slice(),
      type: file.type
    })
  }

  async getAttachment (id: string, file: string): Promise<RxAttachment<T>> {
    const obj = await this.entities.findOne(id).exec()
    const attachment = obj.getAttachment(file)
    return attachment
  }

  private mappedItems (items) {
    const r = items
      .filter(i => i && i._id)
      .map(i => {
        const o: Entity = i.c
        o._id = i._id
        o._timestamp = i.d
        o._type = i.t
        o._group = i.g
        o._mark = i.m
        return o as unknown as T
      })
    return r
  }
}
