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
import JsonDumpPlugin from 'rxdb/plugins/json-dump';

import { RxDatabase, RxCollection, RxReplicationState } from 'rxdb'

import { ENV } from 'environments/environment'
import { Entity } from "../models/entity"
import { DatabaseConfig, Profile } from '@balnc/core/profile/data/profile';
import { ProfileService } from '@balnc/core/profile/services/profile.service';

RxDB.QueryChangeDetector.enable()

if (!ENV.isProd) {
    console.log("[DatabaseService]", "In debug")
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
RxDB.plugin(JsonDumpPlugin)
RxDB.plugin(require('pouchdb-adapter-http'))
RxDB.plugin(require('pouchdb-adapter-idb'))
RxDB.plugin(require('pouchdb-adapter-websql'))

@Injectable()
export class DatabaseService {

    private db: RxDatabase = null
    private entities: { [key: string]: Entity } = {}
    private hadAuthed = false
    private adapter = null
    private replicationStates: { [key: string]: RxReplicationState } = {}

    private config: DatabaseConfig

    constructor(
        private http: HttpClient,
        private profileService: ProfileService,
    ) { }

    async load(entities: Entity[]) {
        console.log("[DatabaseService]", "setup entities", entities, this.config.prefix, "loadedEntities", this.entities)
        for (const entity of entities) {
            if (this.entityLoaded(entity.name)) { return }
            await this.db.collection({
                name: `${this.config.prefix}/${entity.name}`,
                schema: entity.schema,
                migrationStrategies: entity.migrationStrategies || {}
            })
            this.entities[`${this.config.prefix}/${entity.name}`] = entity
        }
        this.sync()
    }

    sync() {
        Object.keys(this.entities).forEach((key) => {
            const entity = this.entities[key]

            if (entity.sync && this.config.host) {
                const ent: RxCollection<any> = this.db[key]
                this.replicationStates[key] = ent.sync({
                    remote: `${this.config.host}/${this.config.prefix}-${entity.name}/`,
                    options: {
                        live: true,
                        retry: true
                    },
                })

                this.replicationStates[key].error$.subscribe((err) => {
                    console.log("[DatabaseService]", "Sync Error", err)
                    this.profileService.logout()
                })
                // this.replicationStates[key].docs$.subscribe(docData => {
                //     console.dir("replicationState", docData)
                // });
            }
        })
    }

    async get<T>(name: string): Promise<RxCollection<T>> {
        return this.db[`${this.config.prefix}/${name}`]
    }

    private entityLoaded(name) {
        const entity = Object.keys(this.entities).findIndex((e) => {
            return e === `${this.config.prefix}/${name}`
        })
        return entity !== -1
    }

    async setup(profile: Profile) {
        this.config = profile.remote || {}

        console.log("[DatabaseService]", "initializing...")

        if (!this.db) {
            this.adapter = await this.getAdapter()
            this.db = await RxDB.create({
                name: "db",
                adapter: this.adapter,
            })
        }

        console.log("[DatabaseService]", "Initialized with profile:", profile)
    }

    async authenticate(username: string, password: string) {
        const resp = await this.http.post(`${this.config.host}/_session`, {
            name: username,
            password: password,
        }, { withCredentials: true })
            .toPromise()
            .catch((res) => {
                console.log("[DatabaseService]", "Failed to login to remote")
            })

        if (!resp) {
            return false
        }

        this.profileService.login(username, resp["roles"])
        this.sync()
        return true
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

    async backup() {
        await this.db.destroy();
        return await this.db.dump()
    }

}
