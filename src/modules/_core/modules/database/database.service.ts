import { Injectable, Inject } from '@angular/core'
import RxDB from 'rxdb/plugins/core'
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check'
import RxDBValidateModule from 'rxdb/plugins/validate'
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election'
import RxDBReplicationModule from 'rxdb/plugins/replication'
import KeycompressionPlugin from 'rxdb/plugins/key-compression'

import { environment } from './environments/environment'

import { RxPresentationDocument, PresentationsDatabase } from './general/marketing/presentations/data/models/presentation'
import { RxDatabase, RxCollection } from 'rxdb';

if (environment.production) {
    // schema-checks should be used in dev-mode only
    RxDB.plugin(RxDBSchemaCheckModule)
}
RxDB.plugin(KeycompressionPlugin);
RxDB.plugin(RxDBValidateModule)
RxDB.plugin(RxDBLeaderElectionModule)
RxDB.plugin(RxDBReplicationModule)
RxDB.plugin(require('pouchdb-adapter-http'))

RxDB.QueryChangeDetector.enable()
RxDB.QueryChangeDetector.enableDebugging()

RxDB.plugin(require('pouchdb-adapter-idb'))

const syncURL = 'http://127.0.0.1:5984/'

@Injectable()
export class DatabaseService {

    private static instance: DatabaseService = null;

    entities: any
    dbs: RxCollection<any>[] = []

    // Return the instance of the service
    public static getInstance(): DatabaseService {
        if (DatabaseService.instance === null) {
            DatabaseService.instance = new DatabaseService([]);
        }
        return DatabaseService.instance;
    }

    constructor(
        @Inject("APP_ENTITIES") entities: any,
    ) {
        this.entities = entities
        this.setup()
    }

    private async setup() {

        this.entities.forEach(entity => {

            console.log(`setup schema: ${entity}`)

            this.dbs[entity.name] = RxDB.create({
                name: entity.name,
                adapter: "idb",
                // password: 'myLongAndStupidPassword' // no password needed
            })

            // this.dbs[entity.name]<entity.type>.collection(entity.schema)
            if (entity.sync) {
                this.dbs[entity.name].sync({
                    remote: syncURL + entity.name + '/'
                })
            }
        });
        window['dbs'] = this.dbs
    }

    public get<T>(database: string): Promise<RxCollection<T>> {
        return this.dbs[database].data
    }

}
