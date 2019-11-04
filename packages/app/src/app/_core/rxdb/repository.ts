import { RxCollection } from 'rxdb'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { RxDBService } from './rxdb.service'

export class Repository<T> {

  entity = null
  observables: { [key: string]: Observable<any> } = {}
  entities: RxCollection

  constructor(
    private dbService: RxDBService
  ) {
    this.entities = this.dbService.db.entities
  }

  async all(): Promise<T[]> {
    const items = await this.entities.find().where('type').eq(this.entity).exec()
    return this.mappedItems(items)
  }

  all$(): Observable<T[]> {
    return this.entities.find().where('type').eq(this.entity).$.pipe(
      map((items) => this.mappedItems(items))
    )
  }

  async one(id: string): Promise<T> {
    const item = await this.entities.findOne(id).exec()
    if (!item) return null
    return this.mappedItems([item])[0]
  }

  one$(id: string): Observable<T> {
    return this.entities.findOne(id).$.pipe(
      map((item) => this.mappedItems([item])[0])
    )
  }

  async add<T>(data: Partial<T>, ts?: number): Promise<T> {
    const obj = {
      data,
      type: this.entity,
      timestamp: ts || Date.now()
    }
    const doc = await this.entities.insert(obj)
    return this.mappedItems([doc])[0]
  }

  async update(id: string, query: any) {
    const item = await this.entities.findOne(id).exec()
    await item.update(query)
  }

  async remove(id: string): Promise<void> {
    const obj = await this.entities.findOne(id).exec()
    await obj.remove()
  }

  private mappedItems(items) {
    const r = items
      .filter(i => i._id)
      .map(i => {
        const o = i.data
        o._id = i._id
        o._timestamp = i.timestamp
        o._type = i.type
        return o as T
      })
    return r
  }
}
