import { NgZone } from '@angular/core';
import { RxDatabase, RxDocument } from 'rxdb';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Entity } from '../../_core/rxdb/entity';
import { RxDBService } from '../../_core/rxdb/rxdb.service';

export interface CommonConfig {
  alias: string
  entities: Entity[]
}

export class CommonService {

  observables: { [key: string]: Observable<any> } = {}
  db: RxDatabase

  constructor(
    private zone: NgZone,
    private dbService: RxDBService,
  ) { }

  async setup(config: CommonConfig) {
    if (!this.db) {
      this.db = await this.dbService.setup(config.alias, config.entities)
      config.entities.forEach(entity => {
        this.observables[`${entity.name}$`] = this.db[entity.name].find().$
      })
    }
  }

  async getAll<T>(entity: string, params: any = {}): Promise<(RxDocument<T> & T)[]> {
    return this.db[entity].find(params).exec()
  }

  getAll$<T>(entity: string, params: any = {}): Observable<(RxDocument<T> & T)[]> {
    return this.db[entity].find(params).$.pipe(
      tap(() => {
        setTimeout(() => {
          this.zone.run(() => { })
        }, 100);
      })
    )
  }

  async getOne<T>(entity: string, id): Promise<RxDocument<T> & T> {
    const obj = await this.db[entity].findOne(id).exec()
    if (!obj) return null
    return obj
  }

  getOne$<T>(entity: string, id): Observable<RxDocument<T> & T> {
    return this.db[entity].findOne(id).$.pipe(
      tap(() => {
        setTimeout(() => {
          this.zone.run(() => { })
        }, 100);
      })
    )
  }

  async addOne<T>(entity: string, obj: T): Promise<RxDocument<T> & T> {
    let doc = this.db[entity].newDocument(obj)
    await doc.save()
    return doc
  }
}
