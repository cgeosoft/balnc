import { Injectable, Inject } from '@angular/core'
import { CanActivate } from '@angular/router';

import { BehaviorSubject } from 'RxJS'

import RxDB from 'rxdb/plugins/core'
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check'
import RxDBValidateModule from 'rxdb/plugins/validate'
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election'
import RxDBReplicationModule from 'rxdb/plugins/replication'
import KeycompressionPlugin from 'rxdb/plugins/key-compression'

import { environment } from '../../../../environments/environment'

import { RxDatabase, RxCollection } from 'rxdb'
import { Database } from '../../../business/invoices/data/db.service'
import { RxChatDatabase } from '../../../general/chat/typings/typings'

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
export class DatabaseService implements CanActivate {

    db: RxDatabase = null
    // collectionStatuses: CollectionStatus[]

    constructor(
    ) {
        if (!this.db) {
            this.init()
        }
    }

    private async init() {
        this.db = await RxDB
            .create({
                name: "db",
                adapter: "idb",
            })
    }

    canActivate() {
        return false;
    }

    public setup(entities: any[]) {
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
                })
        })
    }

    public get<T>(name: string): RxCollection<T> {
        return this.db[name]
    }

}
