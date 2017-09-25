import { Injectable } from '@angular/core';
import RxDB from 'rxdb/plugins/core';
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election';
import RxDBReplicationModule from 'rxdb/plugins/replication';
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check';
import RxDBValidateModule from 'rxdb/plugins/validate';

import * as RxDBTypes from '../typings/rxdb.d';

if (ENV === 'development') {
    // schema-checks should be used in dev-mode only
    RxDB.plugin(RxDBSchemaCheckModule)
}

RxDB.plugin(RxDBValidateModule)
RxDB.plugin(RxDBLeaderElectionModule)
RxDB.plugin(RxDBReplicationModule)
RxDB.plugin(require('pouchdb-adapter-http'))


// import typings
RxDB.QueryChangeDetector.enable()
RxDB.QueryChangeDetector.enableDebugging()

const adapters = {
    localstorage: require('pouchdb-adapter-localstorage'),
    websql: require('pouchdb-adapter-websql'),
    idb: require('pouchdb-adapter-idb')
}

const useAdapter = 'localstorage'
RxDB.plugin(adapters[useAdapter])

console.log('hostname: ' + window.location.hostname)
const syncURL = 'http://' + window.location.hostname + ':10101/'

let doSync = true
if (window.location.hash === '#nosync') { doSync = false }

@Injectable()
export class DatabaseService {

    static dbPromise: Promise<RxDBTypes.RxHeroesDatabase> = null

    collections = [
        {
            name: 'hero',
            schema: require('../schemas/hero.json'),
            methods: {
                hpPercent() {
                    return this.hp / this.maxHP * 100
                }
            },
            sync: true
        }
    ]

    private async _create(): Promise<RxDBTypes.RxHeroesDatabase> {
        console.log('DatabaseService: creating database..')
        const db: RxDBTypes.RxHeroesDatabase = await RxDB.create({
            name: 'heroes',
            adapter: useAdapter,
            // password: 'myLongAndStupidPassword' // no password needed
        })
        console.log('DatabaseService: created database')
        window['db'] = db // write to window for debugging

        // show leadership in title
        db.waitForLeadership()
            .then(() => {
                console.log('isLeader now')
                document.title = '♛ ' + document.title
            })

        // create collections
        console.log('DatabaseService: create collections')
        await Promise.all(this.collections.map(colData => db.collection(colData)))

        // hooks
        console.log('DatabaseService: add hooks')
        db.collections.hero.preInsert(function (docObj) {
            const color = docObj.color
            return db.collections.hero.findOne({ color }).exec()
                .then(has => {
                    if (has != null) {
                        alert('another hero already has the color ' + color)
                        throw new Error('color already there')
                    }
                    return db
                })
        })

        // sync
        console.log('DatabaseService: sync')
        this.collections
            .filter(col => col.sync)
            .map(col => col.name)
            .forEach(colName => db[colName].sync({ remote: syncURL + colName + '/' }))

        return db
    }

    get(): Promise<RxDBTypes.RxHeroesDatabase> {
        if (DatabaseService.dbPromise) {
            return DatabaseService.dbPromise
        }

        // create database
        DatabaseService.dbPromise = this._create()
        return DatabaseService.dbPromise
    }
}
