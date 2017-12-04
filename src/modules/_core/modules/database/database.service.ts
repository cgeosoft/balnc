import { Injectable, Inject } from '@angular/core'

import { BehaviorSubject } from 'rxjs/Rx'

import RxDB from 'rxdb/plugins/core'
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check'
import RxDBValidateModule from 'rxdb/plugins/validate'
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election'
import RxDBReplicationModule from 'rxdb/plugins/replication'
import KeycompressionPlugin from 'rxdb/plugins/key-compression'
import { RxDatabase, RxCollection } from 'rxdb'

import { environment } from '../../../../environments/environment'
import { Database } from '../../../business/invoices/data/db.service'
import { Entity } from "./models/entity"

if (!environment.production) {
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

const syncURL = 'https://couchdb-1c46d8.smileupps.com/'

@Injectable()
export class DatabaseService {

    static db: RxDatabase = null

    loadedEntities: string[] = []
    loadedEntitesSubject: BehaviorSubject<Array<string>> = new BehaviorSubject([])

    constructor(
        @Inject("APP_ENTITIES") entities: Entity[],
    ) {
        if (!DatabaseService.db) {
            this.init()
                .then(() => {
                    this.setup(entities)
                })
        } else {
            this.setup(entities)
        }
    }

    private async init() {
        DatabaseService.db = await RxDB
            .create({
                name: "db",
                adapter: "idb",
            })
    }

    public setup(entities: Entity[]) {
        if (!entities) { return }
        entities.forEach(entity => {
            DatabaseService.db
                .collection(entity)
                .then(collection => {
                    if (entity.sync) {
                        collection.sync({
                            remote: syncURL + entity.name + '/'
                        })
                    }
                    this.loadedEntities.push(entity.name)
                    this.loadedEntitesSubject.next(this.loadedEntities)
                })
        })
    }

    public get<T>(name: string): Promise<RxCollection<T>> {
        return new Promise((resolve, reject) => {
            this.loadedEntitesSubject
                .subscribe((loadedEntities) => {
                    const entity = loadedEntities.find(i => {
                        return i === name
                    })
                    if (entity) { resolve(DatabaseService.db[name]) }
                })
        })
    }

}
