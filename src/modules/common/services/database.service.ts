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
import { DatabaseConfig, Profile } from '@balnc/core/profile/data/profile';

RxDB.QueryChangeDetector.enable()

if (!ENV.production) {
    RxDB.plugin(RxDBSchemaCheckModule)
    // RxDB.QueryChangeDetector.enableDebugging()
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

    private db: RxDatabase = null
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
            if (this.entityLoaded(entity.name)) { return }
            const ent = await this.db.collection({
                name: `${this.config.prefix}/${entity.name}`,
                schema: entity.schema,
            })
            this.entities.push(entity)
            add.push(ent)
        }

        await Promise.all(add)
        this.sync()
    }

    public sync() {

        if (!this.config.host) {
            return
        }

        this.entities
            .filter(entity => entity.sync)
            .forEach(entity => {
                this.db[`${this.config.prefix}/${entity.name}`].sync({
                    remote: `${this.config.host}/${this.config.prefix}-${entity.name}/`,
                    options: {
                        live: true,
                        retry: true
                    },
                })
            })
    }

    public async get<T>(name: string): Promise<RxCollection<T>> {
        return this.db[`${this.config.prefix}/${name}`]
    }

    private entityLoaded(parsedName) {
        const entity = this.entities.findIndex((e) => {
            return e.name === parsedName
        })
        return entity !== -1
    }

    async setup(profile: Profile) {
        this.config = profile.database || {}

        console.log("DatabaseService initializing...")

        if (!this.db) {
            this.adapter = await this.getAdapter()
            this.db = await RxDB.create({
                name: "db",
                adapter: this.adapter,
            })
        }

        if (this.config.user) {
            await this.http.post(`${this.config.host}/_session`, {
                name: this.config.user,
                password: this.config.pass,
            }, { withCredentials: true })
                .toPromise()
                .catch((res) => {
                    console.log("Failed to login to remote")
                })
        }

        console.log("DatabaseService Initialized with profile:", profile)
    }

    private async getAdapter() {
        return "idb"
        // if (await RxDB.checkAdapter('idb')) {
        //     return "idb"
        // }
        // if (await RxDB.checkAdapter('websql')) {
        //     return "websql"
        // }
    }

}
