import { RxDatabase, RxDocument } from 'rxdb';
import { Observable } from 'rxjs';
import { Entity } from '../../_core/rxdb/entity';
import { RxDBService } from '../../_core/rxdb/rxdb.service';

export interface CommonConfig {
  alias: string
  entities: Entity[]
  dbService: RxDBService
}

export class CommonService {

  observables: { [key: string]: Observable<any> } = {}
  db: RxDatabase
  config: CommonConfig

  constructor (config: CommonConfig) {
    this.config = config
  }

  async setup () {
    if (!this.db) {
      console.log(`Setup ${this.config.alias} db`,this.config.dbService)
      this.db = await this.config.dbService.setup(this.config.alias, this.config.entities)
      this.config.entities.forEach(entity => {
        this.observables[`${entity.name}$`] = this.db[entity.name].find().$
      })
      console.log(`...Setuped ${this.config.alias} `)
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
