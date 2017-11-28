import { Injectable } from '@angular/core'
import RxDB from 'rxdb/plugins/core'
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check'
import RxDBValidateModule from 'rxdb/plugins/validate'
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election'
import RxDBReplicationModule from 'rxdb/plugins/replication'
import KeycompressionPlugin from 'rxdb/plugins/key-compression'

import { environment } from '../../../environments/environment'

import { RxPresentationDocument, PresentationsDatabase } from '../../marketing/presentations/data/models/presentation'

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

const adapters = {
    localstorage: require('pouchdb-adapter-localstorage'),
    websql: require('pouchdb-adapter-websql'),
    idb: require('pouchdb-adapter-idb')
}

const useAdapter = 'localstorage'
RxDB.plugin(adapters[useAdapter])

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
    static dbPromise: Promise<PresentationsDatabase> = null

    private async _create(): Promise<PresentationsDatabase> {
        const db: PresentationsDatabase = await RxDB.create({
            name: 'presentation',
            adapter: useAdapter,
            // password: 'myLongAndStupidPassword' // no password needed
        })
        window['db'] = db // write to window for debugging

        // // show leadership in title
        // db.waitForLeadership()
        //     .then(() => {
        //         document.title = '♛ ' + document.title
        //     })

        // create collections
        await Promise.all(collections.map(colData => db.collection(colData)))

        // hooks
        // db.collections.hero.preInsert(function (docObj) {
        //     const color = docObj.color
        //     return db.collections.hero.findOne({ color }).exec()
        //         .then(has => {
        //             if (has != null) {
        //                 alert('another hero already has the color ' + color)
        //                 throw new Error('color already there')
        //             }
        //             return db
        //         })
        // })

        // sync
        collections
            .filter(col => col.sync)
            .map(col => col.name)
            .forEach(colName => db[colName].sync({ remote: syncURL + colName + '/' }))

        return db
    }

    get(): Promise<PresentationsDatabase> {
        if (DatabaseService.dbPromise) {
            return DatabaseService.dbPromise
        }
        // create databaseServie
        DatabaseService.dbPromise = this._create()
        return DatabaseService.dbPromise
    }
}