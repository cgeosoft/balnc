import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core'

import { BehaviorSubject } from 'rxjs/Rx'
import * as _ from 'lodash'

import RxDB from 'rxdb/plugins/core'
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check'
import RxDBValidateModule from 'rxdb/plugins/validate'
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election'
import RxDBReplicationModule from 'rxdb/plugins/replication'
import KeycompressionPlugin from 'rxdb/plugins/key-compression'
import AttachmentsPlugin from 'rxdb/plugins/attachments'
import RxDBErrorMessagesModule from 'rxdb/plugins/error-messages'
import AdapterCheckPlugin from 'rxdb/plugins/adapter-check'
import { RxDatabase, RxCollection, RxReplicationState } from 'rxdb'

import { ENV } from 'environments/environment'
import { ConfigService } from "../../config/config.service"
import { Entity } from "../models/entity"
import { HttpClient } from '@angular/common/http'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'

RxDB.QueryChangeDetector.enable()

if (!ENV.production) {
    RxDB.plugin(RxDBSchemaCheckModule)
    RxDB.QueryChangeDetector.enableDebugging()
}

RxDB.plugin(KeycompressionPlugin)
RxDB.plugin(RxDBValidateModule)
RxDB.plugin(RxDBLeaderElectionModule)
RxDB.plugin(RxDBReplicationModule)
RxDB.plugin(AttachmentsPlugin)
RxDB.plugin(RxDBErrorMessagesModule)
RxDB.plugin(AdapterCheckPlugin)
RxDB.plugin(require('pouchdb-adapter-http'))
RxDB.plugin(require('pouchdb-adapter-idb'))
RxDB.plugin(require('pouchdb-adapter-websql'))

@Injectable()
export class DatabaseService implements Resolve<any> {

    public static db: RxDatabase = null
    private static namespace: string
    private static entities: Entity[] = []
    private static hadAuthed = false
    private static adapter = null
    private static replicationStates: { [key: string]: RxReplicationState } = {}

    constructor(
        @Inject("APP_ENTITIES") entities: Entity[],
        private configSrv: ConfigService,
        private http: HttpClient,
    ) {
        if (entities.length === 0) { return }
        console.log("DatabaseService constructor", entities)
        this.setup(entities)
    }

    public async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
        console.log("DatabaseService resolve")
        await this.initDB()
        return true
    }

    public async setup(entities: Entity[]) {
        console.log("DatabaseService setup", entities)
        await this.initDB()

        if (!entities) { return }

        console.log("DatabaseService setup entities", entities, DatabaseService.namespace, "loadedEntities", DatabaseService.entities)

        for (const entity of entities) {

            if (!entity.single) {
                entity.name = this.getEntityName(entity.name)
            }

            if (this.entityLoaded(entity.name)) { return }

            console.log("load entity", entity)
            await DatabaseService.db
                .collection({
                    name: entity.name,
                    schema: entity.schema,
                })
                .then(collection => {
                    if (entity.sync) {
                        const replicationState = collection.sync({
                            remote: `${this.configSrv.get("remoteDB")}/${entity.name}/`,
                            // options: {
                            //     retry: true
                            // },
                        })
                        DatabaseService.replicationStates[entity.name] = replicationState
                    }
                    DatabaseService.entities.push(entity)
                })
        }
    }

    public async get<T>(name: string): Promise<RxCollection<T>> {
        console.log("DatabaseService get", name)
        await this.initDB()
        name = this.getEntityName(name)
        // Observable
        //     .from(DatabaseService.entities)
        return DatabaseService.db[name]

        // let db: RxCollection<T>
        // return new Promise<RxCollection<T>>((resolve, reject) => {
        //     const timer = setInterval(() => {
        //         const db = DatabaseService.db[parsedName]
        //         console.log("got", db)
        //         if (db !== null) {
        //             clearInterval(timer)
        //             resolve(db)
        //         }
        //     }, 500)
        // })
    }

    public setNamespace(namespace: string) {
        console.log("set amespasne", namespace)
        if (namespace !== DatabaseService.namespace) { return }
        localStorage.setItem("account", namespace)
        DatabaseService.namespace = namespace
        this.setup(DatabaseService.entities)
    }

    private entityLoaded(parsedName) {
        const entity = DatabaseService.entities.findIndex((e) => {
            return e.name === parsedName
        })
        return entity !== -1
    }

    private async initDB() {
        if (DatabaseService.db) {
            return
        }
        console.log("DatabaseService initializing...")
        DatabaseService.namespace = localStorage.getItem("account")
        DatabaseService.adapter = await this.getAdapter()
        DatabaseService.db = await RxDB.create({
            name: "db",
            adapter: DatabaseService.adapter,
        })
        await this.http.post(`${this.configSrv.get("remoteDB")}/_session`, {
            name: "demo",
            password: "demo",
        }, { withCredentials: true })
        console.log("DatabaseService Initialized")
    }

    private getEntityName(entityPrimaryName: string) {
        console.log("namespace", DatabaseService.namespace)
        if (!DatabaseService.namespace) {
            return entityPrimaryName
        }
        return `${DatabaseService.namespace}/${entityPrimaryName}`
    }

    private async getAdapter() {

        if (await RxDB.checkAdapter('idb')) {
            return "idb"
        }
        if (await RxDB.checkAdapter('websql')) {
            return "websql"
        }
        // if (await RxDB.checkAdapter('localstorage')) {
        //     return "localstorage"
        // }
    }

}
