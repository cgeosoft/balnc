import { Injectable, Inject } from '@angular/core'
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
import { Promise } from 'core-js/library/web/timers';

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

    db: RxDatabase = null

    constructor(
        @Inject("APP_ENTITIES") entities: any,
    ) {
        // if (!this.db) {
        //     this.init()
        // }
        if (entities) {
            this.setup(entities)
        }
    }

    private async init() {
        this.db = await RxDB.create({
            name: "db",
            adapter: "idb",
        })
            .then(() => {

            })
    }

    private async setup(entities: any[]) {
        if (!this.db) {
            await this.init()
        }
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

    public get<T>(name: string): Promise<RxCollection<T>> {
        return new Promise<RxCollection<T>>((resolve, reject) => {
            let db = null
            while (!RxDB.isRxDatabase(this.db)) {
                db = this.db
            }
            resolve(this.db[name])
        })
    }

}
