import { RxCollection } from 'rxdb'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { RxDBService } from '../../_core/rxdb/rxdb.service'

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
    return items as T[]
  }

  all$(): Observable<T[]> {
    return this.entities.find().where('type').eq(this.entity).$.pipe(
      map((items) => items as T[])
    )
  }

  async one(id: string): Promise<T> {
    const obj = await this.entities.findOne(id).exec()
    if (!obj) return null
    return obj as T
  }

  one$(id: string): Observable<T> {
    return this.entities.findOne(id).$.pipe(
      map((item) => item as T)
    )
  }

  async add(data: any, ts?: number): Promise<T> {
    const obj = {
      data,
      type: this.entity,
      timestamp: ts || Date.now()
    }
    console.log(obj)
    const doc = await this.entities.insert(obj)
    return doc as T
  }

  async remove(id: string): Promise<void> {
    const obj = await this.entities.findOne(id).exec()
    await obj.remove()
  }
}
