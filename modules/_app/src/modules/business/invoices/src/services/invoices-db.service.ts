import { Injectable } from '@angular/core';
import RxDB from 'rxdb/plugins/core';
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check';
import RxDBValidateModule from 'rxdb/plugins/validate';
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election';
import RxDBReplicationModule from 'rxdb/plugins/replication';

import { RxInvoiceDocument, RxInvoicesDatabase } from '../typings/typings';
import { environment } from '../../../../../environments/environment';

if (environment.production) {
    // schema-checks should be used in dev-mode only
    RxDB.plugin(RxDBSchemaCheckModule);
}

RxDB.plugin(RxDBValidateModule);
RxDB.plugin(RxDBLeaderElectionModule);
RxDB.plugin(RxDBReplicationModule);
RxDB.plugin(require('pouchdb-adapter-http'));

RxDB.QueryChangeDetector.enable();
RxDB.QueryChangeDetector.enableDebugging();

const adapters = {
    localstorage: require('pouchdb-adapter-localstorage'),
    websql: require('pouchdb-adapter-websql'),
    idb: require('pouchdb-adapter-idb')
};

const useAdapter = 'localstorage';
RxDB.plugin(adapters[useAdapter]);

let collections = [
    {
        name: 'hero',
        schema: require('../typings/invoice.json'),
        sync: true
    }
];

console.log('hostname: ' + window.location.hostname);
const syncURL = 'http://' + window.location.hostname + ':10101/';

@Injectable()
export class InvoiceDB {
    static dbPromise: Promise<RxInvoicesDatabase> = null;
    private async _create(): Promise<RxInvoicesDatabase> {
        console.log('InvoiceDB: creating database..');
        const db: RxInvoicesDatabase = await RxDB.create({
            name: 'heroes',
            adapter: useAdapter,
            // password: 'myLongAndStupidPassword' // no password needed
        });
        console.log('InvoiceDB: created database');
        window['db'] = db; // write to window for debugging

        // show leadership in title
        db.waitForLeadership()
            .then(() => {
                console.log('isLeader now');
                document.title = '♛ ' + document.title;
            });

        // create collections
        console.log('InvoiceDB: create collections');
        await Promise.all(collections.map(colData => db.collection(colData)));

        // hooks
        console.log('InvoiceDB: add hooks');
        db.collections.hero.preInsert(function (docObj) {
            const color = docObj.color;
            return db.collections.hero.findOne({ color }).exec()
                .then(has => {
                    if (has != null) {
                        alert('another hero already has the color ' + color);
                        throw new Error('color already there');
                    }
                    return db;
                });
        });

        // sync
        console.log('InvoiceDB: sync');
        collections
            .filter(col => col.sync)
            .map(col => col.name)
            .forEach(colName => db[colName].sync({ remote: syncURL + colName + '/' }));

        return db;
    }

    get(): Promise<RxInvoicesDatabase> {
        if (InvoiceDB.dbPromise) {
            return InvoiceDB.dbPromise;
        }
        // create database
        InvoiceDB.dbPromise = this._create();
        return InvoiceDB.dbPromise;
    }
}