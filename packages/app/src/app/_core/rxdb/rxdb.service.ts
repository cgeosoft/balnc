import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import * as AdapterHttp from 'pouchdb-adapter-http'
import * as AdapterIdb from 'pouchdb-adapter-idb'
import * as AdapterMemory from 'pouchdb-adapter-memory'
import { RxDatabase } from 'rxdb'
import AdapterCheckPlugin from 'rxdb/plugins/adapter-check'
import AttachmentsPlugin from 'rxdb/plugins/attachments'
import RxDB from 'rxdb/plugins/core'
import RxDBErrorMessagesModule from 'rxdb/plugins/error-messages'
import JsonDumpPlugin from 'rxdb/plugins/json-dump'
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election'
import RxDBReplicationModule from 'rxdb/plugins/replication'
import RxDBReplicationGraphQL, { RxGraphQLReplicationState } from 'rxdb/plugins/replication-graphql'
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check'
import RxDBUpdateModule from 'rxdb/plugins/update'
import RxDBValidateModule from 'rxdb/plugins/validate'
import environment from '../../../environments/environment'
import { ConfigService } from '../services/config.service'
import { Migrations } from './migrations'
import { RemoteConfig } from './models/config'
import schema from './models/entity.json'

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

@Injectable()
export class RxDBService {

  db: RxDatabase
  replicationState: RxGraphQLReplicationState

  private config: RemoteConfig
  private profileKey: string

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private toastr: ToastrService
  ) {
    if (!configService.profile) return
    this.profileKey = configService.profile.key
    this.config = configService.profile.remote || {
      enabled: false
    }
  }

  async setup() {
    if (!this.configService.profile) {
      console.log('[DatabaseService]', `There is not a selected profile`)
      return
    }

    console.log('[DatabaseService]', `Initializing DB: ${this.profileKey}`)
    const _adapter = await this.getAdapter()

    this.db = await RxDB.create({
      name: `balnc_${this.profileKey}`,
      adapter: _adapter
    })

    await this.db.collection({
      name: 'entities',
      schema: schema,
      migrationStrategies: Migrations
    })

    console.log('[DatabaseService]', `Sync entities`)

    if (!this.config.enabled) {
      return
    }

    // if (this.config.username) {
    //   await this.authenticate(this.config.username, this.config.password)
    // }

    console.log('sync with syncGraphQL')

    this.replicationState = this.db.entities.syncGraphQL({
      url: 'http://127.0.0.1:10102/graphql',
      push: {
        batchSize: 5,
        queryBuilder: (doc) => {
          return {
            query: `
              mutation EntityCreate($doc: EntityInput) {
                setEntity(doc: $doc) {
                  _id,
                  timestamp
                }
              }
            `,
            variables: {
              doc
            }
          }
        }
      },
      pull: {
        queryBuilder: (doc) => {
          if (!doc) {
            doc = {
              id: '',
              updatedAt: 0
            }
          }
          return {
            query: `
                {
                  feedForRxDBReplication(lastId: "${doc._id}", minUpdatedAt: ${doc._timestamp}, limit: 30) {
                    _id
                    timestamp
                    deleted
                    type
                    data
                  }
                }`
            ,
            variables: {}
          }
        }
      },
      live: true,
      /**
       * TODO
       * we have to set this to a low value, because the subscription-trigger
       * does not work sometimes. See below at the SubscriptionClient
       */
      liveInterval: 1000 * 2,
      deletedFlag: 'deleted'
    })
  }

  async authenticate(username: string, password: string) {
    return this.http.post(`${this.config.db}/_session`, {
      name: username,
      password: password
    }, { withCredentials: true })
      .toPromise()
      .catch((res) => {
        this.toastr.error('Could not auto-login with db server. Check your internet connection.', '[Database] Load Failed')
      })
  }

  async removeProfile(profileKey: string) {
    const adapter = await this.getAdapter()
    await RxDB.removeDatabase(`balnc_${profileKey}`, adapter)
  }

  private async getAdapter() {
    // return 'memory'
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
