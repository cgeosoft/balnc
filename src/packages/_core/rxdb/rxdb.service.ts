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
// import AdapterCheckPlugin from 'rxdb/plugins/adapter-check'
import JsonDumpPlugin from 'rxdb/plugins/json-dump'

// import { ToastrService } from 'ngx-toastr'

import * as AdapterHttp from 'pouchdb-adapter-http'
import * as AdapterIDB from 'pouchdb-adapter-idb'

import { RxDatabase, RxCollection, RxReplicationState } from 'rxdb'

import { environment } from 'environments/environment'
import { Entity } from './entity'
import { ConfigService } from '@balnc/common'
import { ToastrService } from 'ngx-toastr'

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
// RxDB.plugin(AdapterCheckPlugin)
RxDB.plugin(JsonDumpPlugin)
RxDB.plugin(AdapterHttp)
RxDB.plugin(AdapterIDB)

@Injectable()
export class RxDBService {

  private db: RxDatabase
  private entities: { [key: string]: Entity } = {}
  private replicationStates: { [key: string]: RxReplicationState } = {}

  constructor (
    private http: HttpClient,
    private configService: ConfigService
    // private toastr: ToastrService
  ) {
  }

  async init () {
    if (!this.configService.profile) {
      console.log('[DatabaseService]', `Can not initialize DB with a valid profile`)
      return
    }

    console.log('[DatabaseService]', `Initializing DB: ${this.configService.profile.id}`)
    const _adapter = await this.getAdapter()
    this.db = await RxDB.create({
      name: this.configService.profile.id,
      adapter: _adapter
    })
  }

  async setup (entities: Entity[]) {
    console.log('[DatabaseService]', `Setup entities`, entities)
    let sets = []
    for (const entity of entities) {
      console.log(`Load entity ${entity.name} in ${this.configService.profile.id}`)
      let set = this.db.collection({
        name: entity.name,
        schema: entity.schema,
        migrationStrategies: entity.migrationStrategies || {}
      })
      this.entities[entity.name] = entity
      sets.push(set)
    }
    await Promise.all(sets)
    await this.sync()
  }

  async sync () {

    if (!this.configService.profile.remoteSync) {
      console.log('[DatabaseService]', `Sync is disabled for ${this.configService.profile.id}`)
      return
    }

    await this.authenticate(this.configService.profile.remoteUsername, this.configService.profile.remotePassword)

    Object.keys(this.entities).forEach((key) => {
      const entity = this.entities[key]

      if (entity.sync) {
        const ent: RxCollection<any> = this.db[key]

        if (!ent) {
          console.log('[DatabaseService]', `Entity ${entity.name} for ${this.configService.profile.id} not found`)
        }

        this.replicationStates[key] = ent.sync({
          remote: `${this.configService.profile.remoteHost}/${this.configService.profile.id}_${entity.name}/`,
          options: {
            live: true,
            retry: true
          }
        })

        this.replicationStates[key].error$.subscribe((err) => {
          console.log('[DatabaseService]', 'Sync Error', err)
        })
      }
    })
  }

  async get<T> (name: string): Promise<RxCollection<T>> {
    return this.db[name]
  }

  async authenticate (username: string, password: string) {
    return this.http.post(`${this.configService.profile.remoteHost}/_session`, {
      name: username,
      password: password
    }, { withCredentials: true })
      .toPromise()
      .catch((res) => {
        // this.toastr.error('Could not auto-login with db server. Check your internet connection', 'Load Failed')
        console.log('[DatabaseService]', 'Failed to login to remote')
      })
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

  async export (alias: string) {
    console.log(this.entities)
    return this.db.dump()
    // const data = await this.db.dump()
    // return data.map(d => {
    //   return d
    // })
  }

}
