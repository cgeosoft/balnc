import { Injectable } from '@angular/core'
import * as AdapterHttp from 'pouchdb-adapter-http'
import * as AdapterIdb from 'pouchdb-adapter-idb'
import * as AdapterMemory from 'pouchdb-adapter-memory'
import { RxCollection, RxDatabase } from 'rxdb'
import AdapterCheckPlugin from 'rxdb/plugins/adapter-check'
import AttachmentsPlugin from 'rxdb/plugins/attachments'
import RxDB from 'rxdb/plugins/core'
import RxDBErrorMessagesModule from 'rxdb/plugins/error-messages'
import InMemoryPlugin from 'rxdb/plugins/in-memory'
import JsonDumpPlugin from 'rxdb/plugins/json-dump'
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election'
import RxDBReplicationModule from 'rxdb/plugins/replication'
import RxDBReplicationGraphQL, { RxGraphQLReplicationState } from 'rxdb/plugins/replication-graphql'
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check'
import RxDBUpdateModule from 'rxdb/plugins/update'
import RxDBValidateModule from 'rxdb/plugins/validate'
import { BehaviorSubject } from 'rxjs'
import environment from '../../../environments/environment'
import { Migrations } from '../migrations'
import schema from '../models/entity.json'
import { ConfigService } from '../services/config.service'

if (!environment.production) {
  console.log('[DatabaseService]', 'In debug')
  RxDB.plugin(RxDBSchemaCheckModule)
  // RxDB.QueryChangeDetector.enableDebugging()
}

RxDB.plugin(RxDBValidateModule)
RxDB.plugin(RxDBLeaderElectionModule)
RxDB.plugin(RxDBReplicationModule)
RxDB.plugin(AttachmentsPlugin)
RxDB.plugin(RxDBErrorMessagesModule)
RxDB.plugin(AdapterCheckPlugin)
RxDB.plugin(JsonDumpPlugin)
RxDB.plugin(AdapterHttp)
RxDB.plugin(AdapterIdb)
RxDB.plugin(AdapterMemory)
RxDB.plugin(RxDBUpdateModule)
RxDB.plugin(RxDBReplicationGraphQL)
RxDB.plugin(InMemoryPlugin)

@Injectable({
  providedIn: 'root'
})
export class RxDBService {

  public db: RxDatabase
  private repStateGQL: RxGraphQLReplicationState

  replicationState: any
  entities: RxCollection
  status$: BehaviorSubject<'active' | 'error' | 'syncing' | 'disabled'>
    = new BehaviorSubject<'active' | 'error' | 'syncing' | 'disabled'>('disabled')

  get workspace () {
    return this.configService.workspace
  }

  constructor (
    private configService: ConfigService
  ) { }

  async setup () {

    if (!this.workspace) {
      console.log('[DatabaseService]', `There is not a selected workspace. Abord!`)
      return
    }

    console.log('[DatabaseService]', `Initializing DB: balnc_${this.workspace.key}`)
    try {
      this.db = await RxDB.create({
        name: `balnc_${this.workspace.key}`,
        adapter: 'idb'
      })
    } catch (err) {
      console.log('[DatabaseService]', err)
      // console.log('[DatabaseService]', `Database exist: balnc_${this.workspace.key}`)
      return
    }

    await this.db.collection({
      name: 'entities',
      schema: schema,
      migrationStrategies: Migrations
    })

    await this.setupCache()
  }

  async setupCache () {
    if (this.workspace.cache) {
      console.log('[DatabaseService]', `Enable cache mode`)
      this.entities = await this.db.entities.inMemory()
    } else {
      console.log('[DatabaseService]', `Cache mode disabled`)
      this.entities = this.db.entities
    }
  }

  async remove (workspaceKey: string) {
    await RxDB.removeDatabase(`balnc_${workspaceKey}`, 'idb')
  }
}
