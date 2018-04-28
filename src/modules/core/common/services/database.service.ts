import { Observable } from 'rxjs/Observable'
import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'

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
import { Entity } from "../models/entity"
import { DatabaseConfig, Profile } from '@blnc/core/profile/data/profile';

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
export class DatabaseService {

    public db: RxDatabase = null
    private entities: Entity[] = []
    private hadAuthed = false
    private adapter = null
    private replicationStates: { [key: string]: RxReplicationState } = {}

    private config: DatabaseConfig

    constructor(private http: HttpClient) { }

    public async loadEntities(entities: Entity[]) {

        console.log("DatabaseService setup entities", entities, this.config.prefix, "loadedEntities", this.entities)

        const add: any[] = []

        for (const entity of entities) {

            const prefixedName = this.getEntityName(entity.name)

            if (this.entityLoaded(entity.name)) { return }

            console.log("load entity", entity)
            const a = await this.db.collection({
                name: prefixedName,
                schema: entity.schema,
            })

            this.entities.push(entity)

            add.push(a)
        }

        await Promise.all(add)
        this.sync()
    }

    public sync() {

        if (!this.config.host) {
            return
        }

        console.log("start syncing")

        this.entities
            .filter(entity => entity.sync)
            .forEach(entity => {
                const prefixedName = this.getEntityName(entity.name)
                this.db[prefixedName].sync({
                    remote: `${this.config.host}/${prefixedName}/`,
                    options: {
                        live: true,
                        retry: true
                    },
                })
            })
    }

    public async get<T>(name: string): Promise<RxCollection<T>> {
        console.log("DatabaseService get", name)
        const prefixedName = this.getEntityName(name)
        return this.db[prefixedName]
    }

    private entityLoaded(parsedName) {
        const entity = this.entities.findIndex((e) => {
            return e.name === parsedName
        })
        return entity !== -1
    }

    async setup(profile: Profile) {
        this.config = profile.database || {}

        console.log("DatabaseService initializing with profile:", profile)
        this.adapter = await this.getAdapter()
        this.db = await RxDB.create({
            name: "db",
            adapter: this.adapter,
        })

        if (this.config.user) {
            console.log(" >> user:", this.config.user)
            const res = await this.http.post(`${this.config.host}/_session`, {
                name: this.config.user,
                password: this.config.pass,
            }, { withCredentials: true })
                .toPromise()
        }

        console.log("DatabaseService Initialized")
    }

    private getEntityName(entityPrimaryName: string) {
        if (!this.config.prefix) {
            return entityPrimaryName
        }
        return `${this.config.prefix}${entityPrimaryName}`
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
