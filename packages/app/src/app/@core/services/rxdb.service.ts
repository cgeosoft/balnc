import { HttpClient } from '@angular/common/http'
import { Injectable, Injector } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
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

@Injectable()
export class RxDBService {

  public db: RxDatabase
  private repStateGQL: RxGraphQLReplicationState
  repStateCouch: any
  entities: RxCollection

  get http () {
    return this.injector.get(HttpClient)
  }

  get configService () {
    return this.injector.get(ConfigService)
  }

  get toastr () {
    return this.injector.get(ToastrService)
  }

  get workspace () {
    return this.configService.workspace
  }

  get config () {
    return this.configService.workspace?.db || {}
  }

  constructor (
    private injector: Injector
  ) {
  }

  async setup () {

    if (!this.workspace) {
      console.log('[DatabaseService]', `There is not a selected workspace. Abord!`)
      return
    }

    console.log('[DatabaseService]', `Initializing DB: ${this.workspace.key}`)

    // if (this.db && this.db.name === `balnc_${this.workspace.key}`) return

    try {
      this.db = await RxDB.create({
        name: `balnc_${this.workspace.key}`,
        adapter: 'idb'
      })
    } catch (err) {
      console.log('[DatabaseService]', `Database exist: balnc_${this.workspace.key}`)
      return
    }

    await this.db.collection({
      name: 'entities',
      schema: schema,
      migrationStrategies: Migrations
    })

    this.setupRemote()
    await this.setupCache()
  }

  setupRemote () {
    switch (this.config?.type) {
      case 'couch':
        this.enableRemoteCouch()
        break
      case 'graphql':
        this.enableRemoteGraphql()
        break
      default:
        if (this.repStateCouch) {
          this.repStateCouch.cancel()
        }
        console.log('[DatabaseService]', `Remote is disabled`)
        break
    }
  }

  async setupCache () {
    if (this.workspace.cache) {
      console.log('[DatabaseService]', `Enable cache mode`)
      this.entities = await this.db.entities.inMemory()
    } else {
      this.entities = this.db.entities
    }
  }

  async needAuthenticate () {
    if (!this.config?.type) return false
    if (this.config.type === 'graphql') {
      // todo
    } else if (this.config.type === 'couch') {
      const resp = await this.http.get(`${this.config.host}/_session`, { withCredentials: true }).toPromise().catch(() => false)
      if (!resp) {
        console.log('[DatabaseService]', `No response from ${this.config.host}/_session. Disable remote`)
        return false
      }
      if (resp['userCtx'].name) {
        console.log('[DatabaseService]', `Already authenticated`)
        return false
      }
    }
    return true
  }

  async authenticate (password: string) {
    return this.http.post(`${this.config.host}/_session`, {
      name: this.config.username,
      password: password
    }, { withCredentials: true })
      .toPromise()
      .catch((res) => {
        this.toastr.error('Could not auto-login with db server. Check your internet connection.', '[Database] Load Failed')
      })
  }

  async remove (workspaceKey: string) {
    await RxDB.removeDatabase(`balnc_${workspaceKey}`, 'idb')
  }

  private enableRemoteCouch () {
    if (!this.config?.host || !this.config?.key) {
      console.log('[DatabaseService]', `Remote for couch is not configured`)
      return
    }
    this.repStateCouch = this.db.entities.sync({
      remote: `${this.config.host}/${this.config.key}`
    })
  }

  private enableRemoteGraphql () {
    console.log('[DatabaseService]', 'sync with syncGraphQL')

    this.repStateGQL = this.db.entities.syncGraphQL({
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
                  feedForRxDBReplication(lastId: "${doc._id}", minUpdatedAt: ${doc._date}, limit: 30) {
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
}
