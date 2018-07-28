import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import RxDB from 'rxdb/plugins/core'
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check'
import RxDBValidateModule from 'rxdb/plugins/validate'
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election'
import RxDBReplicationModule from 'rxdb/plugins/replication'
// import KeycompressionPlugin from 'rxdb/plugins/key-compression'
import AttachmentsPlugin from 'rxdb/plugins/attachments'
import RxDBErrorMessagesModule from 'rxdb/plugins/error-messages'
import AdapterCheckPlugin from 'rxdb/plugins/adapter-check'
import JsonDumpPlugin from 'rxdb/plugins/json-dump'

import * as AdapterHttp from 'pouchdb-adapter-http'
import * as AdapterIDB from 'pouchdb-adapter-idb'

import { RxDatabase, RxCollection, RxReplicationState } from 'rxdb'

import { environment } from 'environments/environment'
import { Entity } from '../models/entity'
import { ConfigService } from './config.service'

RxDB.QueryChangeDetector.enable()

if (!environment.production) {
  console.log('[DatabaseService]', 'In debug')
  RxDB.plugin(RxDBSchemaCheckModule)
  RxDB.QueryChangeDetector.enableDebugging()
}

// RxDB.plugin(KeycompressionPlugin)
RxDB.plugin(RxDBValidateModule)
RxDB.plugin(RxDBLeaderElectionModule)
RxDB.plugin(RxDBReplicationModule)
RxDB.plugin(AttachmentsPlugin)
RxDB.plugin(RxDBErrorMessagesModule)
RxDB.plugin(AdapterCheckPlugin)
RxDB.plugin(JsonDumpPlugin)
RxDB.plugin(AdapterHttp)
RxDB.plugin(AdapterIDB)

@Injectable()
export class DatabaseService {

  private db: RxDatabase = null
  private entities: { [key: string]: Entity } = {}
  private adapter = null
  private replicationStates: { [key: string]: RxReplicationState } = {}

  constructor (
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  async setup (entities: Entity[]) {

    console.log('[DatabaseService]', 'Initializing DB...')
    this.adapter = await this.getAdapter()
    this.db = await RxDB.create({
      name: 'db',
      adapter: this.adapter
    })

    if (!this.configService.profile) {
      return
    }

    console.log('[DatabaseService]', 'Set entities for', entities, this.configService.profile.alias, 'loadedEntities', this.entities)

    let sets = []
    for (const entity of entities) {
      let set = await this.db.collection({
        name: `${this.configService.profile.alias}/${entity.name}`,
        schema: entity.schema,
        migrationStrategies: entity.migrationStrategies || {}
      })
      this.entities[`${this.configService.profile.alias}/${entity.name}`] = entity
      sets.push(set)
    }

    await Promise.all(sets)

    if (this.configService.profile.remoteSync && this.configService.profile.remoteHost) {
      this.sync()
    }
  }

  sync () {
    Object.keys(this.entities).forEach((key) => {
      const entity = this.entities[key]

      if (entity.sync) {
        const ent: RxCollection<any> = this.db[key]
        this.replicationStates[key] = ent.sync({
          remote: `${this.configService.profile.remoteHost}/${this.configService.profile.remotePrefix}-${entity.name}/`,
          options: {
            live: true,
            retry: true
          }
        })

        this.replicationStates[key].error$.subscribe((err) => {
          console.log('[DatabaseService]', 'Sync Error', err)
          // this.profileService.logout()
        })
        // this.replicationStates[key].docs$.subscribe(docData => {
        //     console.dir("replicationState", docData)
        // });
      }
    })
  }

  async get<T> (name: string): Promise<RxCollection<T>> {
    return this.db[`${this.configService.profile.alias}/${name}`]
  }

  async authenticate (username: string, password: string) {
    const resp = await this.http.post(`${this.configService.profile.remoteHost}/_session`, {
      name: username,
      password: password
    }, { withCredentials: true })
      .toPromise()
      .catch((res) => {
        console.log('[DatabaseService]', 'Failed to login to remote')
      })

    if (!resp) {
      return false
    }

    // this.profileService.login(username, resp["roles"])
    this.sync()
    return true
  }

  private async getAdapter () {
    // if (await RxDB.checkAdapter('idb')) {
    //     return "idb"
    // }
    // if (await RxDB.checkAdapter('websql')) {
    //     return "websql"
    // }
    return 'idb'
  }

  async backup () {
    await this.db.destroy()
    return this.db.dump()
  }

}
