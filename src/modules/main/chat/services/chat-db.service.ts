import { Injectable } from '@angular/core'
import RxDB from 'rxdb'
import KeycompressionPlugin from 'rxdb/src/plugins/key-compression'
import RxDBLeaderElectionModule from 'rxdb/src/plugins/leader-election'
import RxDBReplicationModule from 'rxdb/src/plugins/replication'
import RxDBValidateModule from 'rxdb/src/plugins/validate'

import * as RxDBTypes from '../typings/typings.d'

// declare const ENV = "development"
// if (ENV === 'development') {
//     // schema-checks should be used in dev-mode only
//     RxDB.plugin(RxDBSchemaCheckModule)
// }

RxDB.plugin(RxDBValidateModule)
RxDB.plugin(RxDBLeaderElectionModule)
RxDB.plugin(RxDBReplicationModule)
RxDB.plugin(KeycompressionPlugin)
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
export class ChatDB {

    static dbPromise: Promise<RxDBTypes.RxChatDatabase> = null

    collections = [{
        name: 'messages',
        schema: require('../typings/message.json'),
        sync: true,
        options: {
            live: true,
            retry: true
        },
        // migrationStrategies: {
        //     // 1 means, this transforms data from version 0 to version 1
        //     1: function (oldDoc) {
        //         // oldDoc.time = new Date(oldDoc.time).getTime() // string to unix
        //         return oldDoc
        //     }
        // }
    }, {
        name: 'rooms',
        schema: require('../typings/room.json'),
        sync: true,
        options: {
            live: true,
            retry: true
        },
        // migrationStrategies: {
        //     // 1 means, this transforms data from version 0 to version 1
        //     1: function (oldDoc) {
        //         // oldDoc.time = new Date(oldDoc.time).getTime() // string to unix
        //         return oldDoc
        //     }
        // }
    }]

    private async _create(): Promise<RxDBTypes.RxChatDatabase> {
        console.log('ChatDB: creating database..')
        const db: RxDBTypes.RxChatDatabase = await RxDB.create({
            name: 'chat',
            adapter: useAdapter,
            // password: 'myLongAndStupidPassword' // no password needed
        })
        console.log('ChatDB: created database')
        // window['db'] = db // write to window for debugging

        // show leadership in title
        // db.waitForLeadership()
        //     .then(() => {
        //         console.log('isLeader now')
        //         document.title = '♛ ' + document.title
        //     })

        // create collections
        console.log('ChatDB: create collections')
        await Promise.all(this.collections.map(colData => db.collection(colData)))

        // sync
        console.log('ChatDB: sync')
        this.collections
            .filter(col => col.sync)
            .map(col => col.name)
            .forEach(colName => {
                db[colName].sync({ remote: syncURL + colName + '/' })
            })

        return db
    }

    get(): Promise<RxDBTypes.RxChatDatabase> {
        if (ChatDB.dbPromise) {
            return ChatDB.dbPromise
        }

        // create database
        ChatDB.dbPromise = this._create()
        return ChatDB.dbPromise
    }
}
