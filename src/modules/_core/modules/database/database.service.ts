import { Injectable, Inject } from '@angular/core'

import { BehaviorSubject } from 'RxJS'

import RxDB from 'rxdb/plugins/core'
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check'
import RxDBValidateModule from 'rxdb/plugins/validate'
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election'
import RxDBReplicationModule from 'rxdb/plugins/replication'
import KeycompressionPlugin from 'rxdb/plugins/key-compression'
import { RxDatabase, RxCollection } from 'rxdb'

import { environment } from '../../../../environments/environment'

import { Database } from '../../../business/invoices/data/db.service'
import { RxChatDatabase } from '../../../general/chat/typings/typings'

import { Entity } from "./models/entity"

if (environment.production) {
    // schema-checks should be used in dev-mode only
    RxDB.plugin(RxDBSchemaCheckModule)
}
RxDB.plugin(KeycompressionPlugin)
RxDB.plugin(RxDBValidateModule)
RxDB.plugin(RxDBLeaderElectionModule)
RxDB.plugin(RxDBReplicationModule)
RxDB.plugin(require('pouchdb-adapter-http'))
RxDB.plugin(require('pouchdb-adapter-idb'))

RxDB.QueryChangeDetector.enable()
RxDB.QueryChangeDetector.enableDebugging()


const syncURL = 'http://127.0.0.1:5984/'

@Injectable()
export class DatabaseService {

    loadedEntities: string[] = []
    loadedEntitesSubject: BehaviorSubject<Array<string>> = new BehaviorSubject([])
    db: RxDatabase = null
    // collectionStatuses: CollectionStatus[]

    constructor(
        @Inject("APP_ENTITIES") entities: any,
    ) {
        if (!this.db) {
            this.init()
        }

        console.log(`setup entities:`, entities)
        this.setup(entities)
    }

    private async init() {
        this.db = await RxDB
            .create({
                name: "db",
                adapter: "idb",
            })
    }

    public setup(entities: Entity[]) {
        console.log(`setup entities:`, entities)
        if (!entities) { return }
        entities.forEach(entity => {
            console.log(`setup schema: ${entity.name}`, entity)
            this.db
                .collection(entity)
                .then(collection => {
                    if (entity.sync) {
                        collection.sync({
                            remote: syncURL + entity.name + '/'
                        })
                    }
                    this.loadedEntities.push(entity.name)
                    this.loadedEntitesSubject.next(this.loadedEntities)
                    console.log(`tup schem`, this.loadedEntities)
                })
        })
    }

    public get<T>(name: string): Promise<RxCollection<T>> {
        console.log(`get RxCollection: ${name}`)
        return new Promise((resolve, reject) => {
            this.loadedEntitesSubject
                .subscribe((loadedEntities) => {
                    const entity = loadedEntities.find(i => {
                        return i === name
                    })
                    console.log(`get RxCollection found: ${entity}`, loadedEntities)
                    if (entity) { resolve(this.db[name]) }
                })
        })
    }

}
