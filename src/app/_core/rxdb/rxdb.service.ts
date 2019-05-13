import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as AdapterHttp from 'pouchdb-adapter-http';
import * as AdapterIDB from 'pouchdb-adapter-idb';
import { RxCollection, RxReplicationState } from 'rxdb';
import AdapterCheckPlugin from 'rxdb/plugins/adapter-check';
import AttachmentsPlugin from 'rxdb/plugins/attachments';
import RxDB from 'rxdb/plugins/core';
import RxDBErrorMessagesModule from 'rxdb/plugins/error-messages';
import JsonDumpPlugin from 'rxdb/plugins/json-dump';
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election';
import RxDBReplicationModule from 'rxdb/plugins/replication';
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check';
import RxDBUpdateModule from 'rxdb/plugins/update';
import RxDBValidateModule from 'rxdb/plugins/validate';
import environment from '../../../environments/environment';
import { ConfigService } from '../services/config.service';
import { Config } from './config';
import { Entity } from './entity';

if (!environment.production) {
  console.log('[DatabaseService]', 'In debug')
  RxDB.plugin(RxDBSchemaCheckModule)
  RxDB.QueryChangeDetector.enableDebugging()
}

RxDB.plugin(RxDBValidateModule)
RxDB.plugin(RxDBLeaderElectionModule)
RxDB.plugin(RxDBReplicationModule)
RxDB.plugin(AttachmentsPlugin)
RxDB.plugin(RxDBErrorMessagesModule)
RxDB.plugin(AdapterCheckPlugin)
RxDB.plugin(JsonDumpPlugin)
RxDB.plugin(AdapterHttp)
RxDB.plugin(AdapterIDB)
RxDB.plugin(RxDBUpdateModule)

@Injectable()
export class RxDBService {

  private config: Config
  // private db: RxDatabase
  public entities: Entity[] = []
  private replicationStates: { [key: string]: RxReplicationState } = {}

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private toastr: ToastrService
  ) {
    this.config = {
      sync: configService.profile.remoteSync,
      prefix: configService.profile.id,
      host: configService.profile.remoteHost,
      username: configService.profile.remoteUsername,
      password: configService.profile.remotePassword
    }
  }

  async setup(alias, entities: Entity[]) {
    if (!this.configService.profile) {
      console.log('[DatabaseService]', `Can not initialize DB with a valid profile`)
      return
    }

    const name = `db_${this.config.prefix}_${alias}`

    console.log('[DatabaseService]', `Initializing DB: ${name}`, entities)
    const _adapter = await this.getAdapter()
    const db = await RxDB.create({
      name: name,
      adapter: _adapter
    })

    let sets = []
    for (const entity of entities) {
      let set = db.collection({
        name: entity.name,
        schema: entity.schema,
        migrationStrategies: entity.migrationStrategies || {}
      })
      this.entities[entity.name] = entity
      sets.push(set)
    }
    await Promise.all(sets)
    await this.sync(alias, db)

    return db
  }

  async sync(alias, db) {

    const name = `${this.config.prefix}_${alias}`

    if (!this.config.sync) {
      return
    }

    if (this.config.username) {
      await this.authenticate(this.config.username, this.config.password)
    }

    Object.keys(this.entities).forEach((key) => {
      const entity = this.entities[key]

      if (entity.sync) {
        const ent: RxCollection<any> = db[key]

        if (!ent) {
          console.log('[DatabaseService]', `Entity ${entity.name} for ${name} not found`)
        }

        this.replicationStates[key] = ent.sync({
          remote: `${this.config.host}/balnc_${name}_${entity.name}/`,
          options: {
            live: true,
            retry: true
          }
        })

        this.replicationStates[key].error$.subscribe((err) => {
          this.toastr.error(err, '[Database] Sync Error')
        })
      }
    })
  }

  // async get<T> (db, name: string): Promise<RxCollection<T>> {
  //   return this.db[name]
  // }

  async authenticate(username: string, password: string) {
    return this.http.post(`${this.config.host}/_session`, {
      name: username,
      password: password
    }, { withCredentials: true })
      .toPromise()
      .catch((res) => {
        this.toastr.error('Could not auto-login with db server. Check your internet connection.', '[Database] Load Failed')
      })
  }

  async removeProfile(profileId: string, entities: Entity[]) {
    const adapter = await this.getAdapter()
    entities.forEach(async (entity) => {
      const name = `db_${profileId}_${entity.name}`
      await RxDB.removeDatabase(name, adapter)
    })
  }

  private async getAdapter() {
    if (await RxDB.checkAdapter('idb')) {
      return 'idb'
    }
    if (await RxDB.checkAdapter('websql')) {
      return 'websql'
    }
  }

  // async export (alias: string) {
  //   console.log(this.entities)
  //   return this.db.dump()
  //   // const data = await this.db.dump()
  //   // return data.map(d => {
  //   //   return d
  //   // })
  // }
}
