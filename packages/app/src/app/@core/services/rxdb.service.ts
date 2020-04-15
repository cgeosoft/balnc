import { HttpClient } from '@angular/common/http'
import { Injectable, Injector } from '@angular/core'
import { ServerIntegrationConfig, User } from '@balnc/shared'
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

@Injectable({
  providedIn: 'root'
})
export class RxDBService {

  public db: RxDatabase
  private repStateGQL: RxGraphQLReplicationState
  repStateCouch$: any
  entities: RxCollection
  workspace$

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

    await this.setupDefaults()

    await this.setupCache()
  }

  async setupDefaults () {
    this.workspace$ = this.db.entities.findOne('workspace').$
    const workspace = await this.db.entities.findOne('workspace').exec()
    if (!workspace) {
      const workspace = {
        _id: 'workspace',
        t: 'system',
        c: { users: [], integrations: {} },
        d: Date.now(),
        s: []
      }
      await this.db.entities.insert(workspace)
    }
  }

  async upsetUser (user: User) {
    const workspace = await this.db.entities.findOne('workspace').exec()
    const content = { ...workspace.c }
    const i = content.users.findIndex(u => u.username === user.username)
    if (i === -1) {
      content.users.push(user)
    } else {
      content.users[i] = user
    }

    await workspace.update({
      $set: {
        c: content
      }
    })
  }

  async updateIntergration (key, config) {
    const workspace = await this.db.entities.findOne('workspace').exec()
    const content = { ...workspace.c }
    content.integrations[key] = config
    console.log("content",content)
    await workspace.update({
      $set: {
        c: content
      }
    })
  }

  enableRemoteDB () {
    const config = this.configService.integrations.server as ServerIntegrationConfig
    let host = config.dbHost || `${config.host}/db`
    this.repStateCouch$ = this.db.entities.sync({
      remote: `${host}/${config.dbName}`
    })
  }

  disableRemoteDB () {
    console.log('[DatabaseService]', `Remote db is disabled`)
    if (this.repStateCouch$) {
      this.repStateCouch$.cancel()
    }
  }

  async needAuthentication () {
    const config = this.configService.integrations.server as ServerIntegrationConfig
    const host = config.dbHost || `${config.host}/db`
    const resp = await this.http.get(`${host}/_session`, { withCredentials: true }).toPromise().catch(() => false)
    if (!resp) {
      console.log('[DatabaseService]', `No response from ${host}/_session. Disable remote`)
      return false
    }
    if (resp['userCtx'].name) {
      console.log('[DatabaseService]', `Already authenticated`)
      return false
    }
    return true
  }

  async authenticate (username: string, password: string) {
    const config = this.configService.integrations.server as ServerIntegrationConfig
    const host = config.dbHost || `${config.host}/db`
    return this.http.post(`${host}/_session`, {
      name: username,
      password: password
    }, { withCredentials: true })
      .toPromise()
      .catch((res) => {
        this.toastr.error('Could not auto-login with db server. Check your internet connection.', '[Database] Load Failed')
      })
  }

  async setupCache () {
    if (this.workspace.config?.cache) {
      console.log('[DatabaseService]', `Enable cache mode`)
      this.entities = await this.db.entities.inMemory()
    } else {
      this.entities = this.db.entities
    }
  }

  async remove (workspaceKey: string) {
    await RxDB.removeDatabase(`balnc_${workspaceKey}`, 'idb')
  }

  // private enableRemoteCouch () {
  //   if (!this.config?.host || !this.config?.key) {
  //     console.log('[DatabaseService]', `Remote for couch is not configured`)
  //     return
  //   }
  //   this.repStateCouch = this.db.entities.sync({
  //     remote: `${this.config.host}/${this.config.key}`
  //   })
  // }

  // private enableRemoteGraphql () {
  //   console.log('[DatabaseService]', 'sync with syncGraphQL')

  //   this.repStateGQL = this.db.entities.syncGraphQL({
  //     url: 'http://127.0.0.1:10102/graphql',
  //     push: {
  //       batchSize: 5,
  //       queryBuilder: (doc) => {
  //         return {
  //           query: `
  //             mutation EntityCreate($doc: EntityInput) {
  //               setEntity(doc: $doc) {
  //                 _id,
  //                 timestamp
  //               }
  //             }
  //           `,
  //           variables: {
  //             doc
  //           }
  //         }
  //       }
  //     },
  //     pull: {
  //       queryBuilder: (doc) => {
  //         if (!doc) {
  //           doc = {
  //             id: '',
  //             updatedAt: 0
  //           }
  //         }
  //         return {
  //           query: `
  //               {
  //                 feedForRxDBReplication(lastId: "${doc._id}", minUpdatedAt: ${doc._date}, limit: 30) {
  //                   _id
  //                   timestamp
  //                   deleted
  //                   type
  //                   data
  //                 }
  //               }`
  //           ,
  //           variables: {}
  //         }
  //       }
  //     },
  //     live: true,
  //     /**
  //      * TODO
  //      * we have to set this to a low value, because the subscription-trigger
  //      * does not work sometimes. See below at the SubscriptionClient
  //      */
  //     liveInterval: 1000 * 2,
  //     deletedFlag: 'deleted'
  //   })
  // }
}
