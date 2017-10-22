import { Injectable } from '@angular/core';
import RxDB from 'rxdb';
import KeycompressionPlugin from 'rxdb/src/plugins/key-compression';
import RxDBLeaderElectionModule from 'rxdb/src/plugins/leader-election';
import RxDBReplicationModule from 'rxdb/src/plugins/replication';
import RxDBValidateModule from 'rxdb/src/plugins/validate';

import * as RxDBTypes from '../typings/typings.d';

// declare const ENV = "development"
// if (ENV === 'development') {
//     // schema-checks should be used in dev-mode only
//     RxDB.plugin(RxDBSchemaCheckModule)
// }

RxDB.plugin(RxDBValidateModule)
RxDB.plugin(RxDBLeaderElectionModule)
RxDB.plugin(RxDBReplicationModule)
RxDB.plugin(KeycompressionPlugin);
RxDB.plugin(require('pouchdb-adapter-http'))


// import typings
RxDB.QueryChangeDetector.enable()
RxDB.QueryChangeDetector.enableDebugging()

const adapters = {
    localstorage: require('pouchdb-adapter-localstorage'),
    // websql: require('pouchdb-adapter-websql'),
    // idb: require('pouchdb-adapter-idb')
}

const useAdapter = 'localstorage'
RxDB.plugin(adapters[useAdapter])

const syncURL = 'http://192.168.1.30:5984/'

let doSync = true
if (window.location.hash === '#nosync') { doSync = false }

@Injectable()
export class InvoicesDBService {

    static dbPromise: Promise<RxDBTypes.RxInvoicesDatabase> = null

    collections = [
        {
            name: 'invoice',
            schema: require('../typings/invoice.json'),
            methods: {
                // hpPercent() {
                //     return this.hp / this.maxHP * 100
                // }
            },
            sync: true
        }
    ]

    private async _create(): Promise<RxDBTypes.RxInvoicesDatabase> {
        console.log('InvoicesDBService: creating database..')
        const db: RxDBTypes.RxInvoicesDatabase = await RxDB.create({
            name: 'invoices',
            adapter: useAdapter,
            // password: 'myLongAndStupidPassword' // no password needed
        })
        console.log('InvoicesDBService: created database')
        window['db'] = db // write to window for debugging

        // show leadership in title
        // db.waitForLeadership()
        //     .then(() => {
        //         console.log('isLeader now')
        //         document.title = '♛ ' + document.title
        //     })

        // create collections
        console.log('InvoicesDBService: create collections')
        await Promise.all(this.collections.map(colData => db.collection(colData)))

        // hooks
        console.log('InvoicesDBService: add hooks')
        db.collections.invoice.preInsert(function (docObj) {
            const color = docObj.color
            return db.collections.invoice.findOne({ color }).exec()
                .then(has => {
                    if (has != null) {
                        alert('another invoice already has the color ' + color)
                        throw new Error('color already there')
                    }
                    return db
                })
        })

        // sync
        console.log('InvoicesDBService: sync')
        this.collections
            .filter(col => col.sync)
            .map(col => col.name)
            .forEach(colName => db[colName].sync({ remote: syncURL + colName + '/' }))

        return db
    }

    get(): Promise<RxDBTypes.RxInvoicesDatabase> {
        if (InvoicesDBService.dbPromise) {
            return InvoicesDBService.dbPromise
        }

        // create database
        InvoicesDBService.dbPromise = this._create()
        return InvoicesDBService.dbPromise
    }
}
