import { Injectable, Inject } from '@angular/core'
import RxDB from 'rxdb/plugins/core'
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check'
import RxDBValidateModule from 'rxdb/plugins/validate'
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election'
import RxDBReplicationModule from 'rxdb/plugins/replication'
import KeycompressionPlugin from 'rxdb/plugins/key-compression'

import { environment } from '../../../environments/environment'

import { RxPresentationDocument, PresentationsDatabase } from '../../marketing/presentations/data/models/presentation'
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

const collections = [
    {
        name: 'presentation',
        schema: require('../../marketing/presentations/data/models/presentation.json'),
        sync: true,
    }
]

const syncURL = 'http://127.0.0.1:5984/'

@Injectable()
export class DatabaseService {

    schemas: any
    dbs: RxDatabase[]

    // static dbPromise: Promise<PresentationsDatabase> = null

    constructor(
        @Inject("APP_SCHEMAS") schemas: any,
    ) {
        this.schemas = schemas
        this.setup()
    }

    private async setup() {

        this.schemas.forEach(schema => {
            this.dbs[schema.name] = RxDB.create({
                name: schema.name,
                adapter: "idb",
                // password: 'myLongAndStupidPassword' // no password needed
            })
        });
        window['dbs'] = this.dbs

        await Promise.all(this.schemas.map(schema => {
            return this.dbs[schema.name].collection(schema)
        }))

        // sync
        // collections
        //     .filter(col => col.sync)
        //     .map(col => col.name)
        //     .forEach(colName => db[colName].sync({ remote: syncURL + colName + '/' }))

        // return db
    }

    public get<T>(database: string): Promise<RxCollection<T>> {
        return this.dbs[database].data
    }
}
