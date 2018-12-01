import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import RxDB from 'rxdb/plugins/core'
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check'
import RxDBValidateModule from 'rxdb/plugins/validate'
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election'
import RxDBReplicationModule from 'rxdb/plugins/replication'
import AttachmentsPlugin from 'rxdb/plugins/attachments'
import RxDBErrorMessagesModule from 'rxdb/plugins/error-messages'
import AdapterCheckPlugin from 'rxdb/plugins/adapter-check'
import JsonDumpPlugin from 'rxdb/plugins/json-dump'

import { ToastrService } from 'ngx-toastr'

import * as AdapterHttp from 'pouchdb-adapter-http'
import * as AdapterIDB from 'pouchdb-adapter-idb'

import { RxDatabase, RxCollection, RxReplicationState } from 'rxdb'

import { environment } from 'environments/environment'
import { Entity } from './entity'
import { ConfigService } from '../services/config.service'

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

export interface Config {
  sync: boolean
  prefix: string
  host: string
  username: string
  password: string
}

@Injectable()
export class RxDBService {

  private config: Config
  private db: RxDatabase
  public entities: Entity[] = []
  private replicationStates: { [key: string]: RxReplicationState } = {}

  constructor (
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

  async setup (entities: Entity[]) {
    if (!this.configService.profile) {
      console.log('[DatabaseService]', `Can not initialize DB with a valid profile`)
      return
    }

    console.log('[DatabaseService]', `Initializing DB: ${this.config.prefix}`)
    const _adapter = await this.getAdapter()
    this.db = await RxDB.create({
      name: this.config.prefix,
      adapter: _adapter
    })

    console.log('[DatabaseService]', `Setup entities`, entities)
    let sets = []
    for (const entity of entities) {
      console.log(`Load entity ${entity.name} in ${this.config.prefix}`)
      let set = this.db.collection({
        name: entity.name,
        schema: entity.schema,
        migrationStrategies: entity.migrationStrategies || {}
      })
      this.entities[entity.name] = entity
      sets.push(set)
    }
    await Promise.all(sets)

    await this.authenticate(this.config.username, this.config.password)
    await this.sync()
  }

  async sync () {

    if (!this.config.sync) {
      console.log('[DatabaseService]', `Sync is disabled for ${this.config.prefix}`)
      return
    }

    Object.keys(this.entities).forEach((key) => {
      const entity = this.entities[key]

      if (entity.sync) {
        const ent: RxCollection<any> = this.db[key]

        if (!ent) {
          console.log('[DatabaseService]', `Entity ${entity.name} for ${this.config.prefix} not found`)
        }

        this.replicationStates[key] = ent.sync({
          remote: `${this.config.host}/${this.config.prefix}_${entity.name}/`,
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

  async get<T> (name: string): Promise<RxCollection<T>> {
    return this.db[name]
  }

  async authenticate (username: string, password: string) {
    return this.http.post(`${this.config.host}/_session`, {
      name: username,
      password: password
    }, { withCredentials: true })
      .toPromise()
      .catch((res) => {
        this.toastr.error('Could not auto-login with db server. Check your internet connection.', '[Database] Load Failed')
      })
  }

  private async getAdapter () {
    if (await RxDB.checkAdapter('idb')) {
      return 'idb'
    }
    if (await RxDB.checkAdapter('websql')) {
      return 'websql'
    }
  }

  async export (alias: string) {
    console.log(this.entities)
    return this.db.dump()
    // const data = await this.db.dump()
    // return data.map(d => {
    //   return d
    // })
  }
}
