import { Injectable } from '@angular/core'
import { addPouchPlugin, getRxStoragePouch, RxCollection, RxDatabase } from 'rxdb'
import { RxDBAttachmentsPlugin } from 'rxdb/plugins/attachments'
import { addRxPlugin, createRxDatabase, removeRxDatabase } from 'rxdb/plugins/core'
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election'
import { RxDBNoValidatePlugin } from 'rxdb/plugins/no-validate'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder'
import { RxDBUpdatePlugin } from 'rxdb/plugins/update'
import { BehaviorSubject } from 'rxjs'
import environment from '../../../environments/environment'
import { Migrations } from '../migrations'
import schema from '../models/entity.json'
import { ConfigService } from '../services/config.service'

addPouchPlugin(require('pouchdb-adapter-http'))
addPouchPlugin(require('pouchdb-adapter-idb'))

addRxPlugin(RxDBLeaderElectionPlugin)
// addRxPlugin(RxDBReplicationPlugin)
addRxPlugin(RxDBAttachmentsPlugin)
addRxPlugin(RxDBQueryBuilderPlugin)
addRxPlugin(RxDBUpdatePlugin)

if (!environment.production) {
  // await Promise.all([
  //   import('rxdb/plugins/dev-mode').then(module => addRxPlugin(module)),
  //   import('rxdb/plugins/validate').then(module => addRxPlugin(module))
  // ])
} else {
  addRxPlugin(RxDBNoValidatePlugin)
}

@Injectable({
  providedIn: 'root'
})
export class RxDBService {

  public db: RxDatabase

  replicationState: any
  entities: RxCollection
  status$: BehaviorSubject<'active' | 'error' | 'syncing' | 'disabled'>
    = new BehaviorSubject<'active' | 'error' | 'syncing' | 'disabled'>('disabled')

  get workspace() {
    return this.configService.workspace
  }

  constructor(
    private configService: ConfigService
  ) { }

  async setup() {

    if (!this.workspace) {
      console.log('[DatabaseService]', `There is not a selected workspace. Abord!`)
      return
    }

    console.log('[DatabaseService]', `Initializing DB: balnc_${this.workspace.key}`)

    try {
      this.db = await createRxDatabase({
        name: `balnc_${this.workspace.key}`,
        storage: getRxStoragePouch('idb')
      })
    } catch (err) {
      console.log('[DatabaseService]', err)
      // console.log('[DatabaseService]', `Database exist: balnc_${this.workspace.key}`)
      return
    }

    await this.db.addCollections({
      entities: {
        schema: schema,
        migrationStrategies: Migrations
      }
    })

    await this.setupCache()
  }

  async setupCache() {
    if (this.workspace.cache) {
      console.log('[DatabaseService]', `Enable cache mode`)
      this.entities = await this.db.entities.inMemory()
    } else {
      console.log('[DatabaseService]', `Cache mode disabled`)
      this.entities = this.db.entities
    }
  }

  async remove(workspaceKey: string) {
    await removeRxDatabase(`balnc_${workspaceKey}`, getRxStoragePouch('idb'))
  }
}
