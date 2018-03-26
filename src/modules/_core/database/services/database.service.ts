import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'

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
import { ConfigService } from "@blnc/core/config/config.service"
import { Entity } from "../models/entity"
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

    private config: any

    constructor(
        @Inject("APP_ENTITIES") entities: Entity[],
        private http: HttpClient,
        private configService: ConfigService,
    ) {
        if (entities.length === 0) { return }
        console.log("DatabaseService constructor", entities)
        this.setup(entities)
        this.config = this.configService.get("db")
    }

    public async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
        console.log("DatabaseService resolve")
        this.config = this.configService.get("db")
        await this.initDB()
        return true
    }

    public async setup(entities: Entity[]) {
        console.log("DatabaseService setup", entities)
        await this.initDB()

        if (!entities) { return }

        console.log("DatabaseService setup entities", entities, DatabaseService.namespace, "loadedEntities", DatabaseService.entities)

        const add: any[] = [];

        for (const entity of entities) {

            if (!entity.single) {
                entity.name = this.getEntityName(entity.name)
            }

            if (this.entityLoaded(entity.name)) { return }

            console.log("load entity", entity)
            const a = await DatabaseService.db.collection({
                name: entity.name,
                schema: entity.schema,
            })

            DatabaseService.entities.push(entity)

            add.push(a)
        }
        console.log(add)

        await Promise.all(add)
        this.sync()
    }

    public sync() {

        if (!this.config.enableSync) {
            return;
        }

        console.log("start syncing")

        DatabaseService.entities
            .filter(entity => !entity.sync)
            .forEach(entity => {
                DatabaseService.db[entity.name].sync({
                    remote: `${this.config.host}/${entity.name}/`,
                    options: {
                        live: true,
                        retry: true
                    },
                })
            })
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

        if (this.config.needAuth) {
            await this.http.post(`${this.config.host}/_session`, {
                name: this.config.username,
                password: this.config.password,
            }, { withCredentials: true })
        }
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
