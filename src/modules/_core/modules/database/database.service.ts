import { Injectable, Inject } from '@angular/core'

import { BehaviorSubject } from 'rxjs/Rx'
import * as _ from 'lodash'

import RxDB from 'rxdb/plugins/core'
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check'
import RxDBValidateModule from 'rxdb/plugins/validate'
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election'
import RxDBReplicationModule from 'rxdb/plugins/replication'
import KeycompressionPlugin from 'rxdb/plugins/key-compression'
import AttachmentsPlugin from 'rxdb/plugins/attachments';
import RxDBErrorMessagesModule from 'rxdb/plugins/error-messages';
import { RxDatabase, RxCollection } from 'rxdb'

import { environment } from '../../../../environments/environment'
import { ConfigService } from "../config/config.service"
import { Entity } from "./models/entity"
import { HttpClient } from '@angular/common/http';

if (!environment.production) {
    RxDB.plugin(RxDBSchemaCheckModule)
}

RxDB.plugin(KeycompressionPlugin)
RxDB.plugin(RxDBValidateModule)
RxDB.plugin(RxDBLeaderElectionModule)
RxDB.plugin(RxDBReplicationModule)
RxDB.plugin(AttachmentsPlugin);
RxDB.plugin(RxDBErrorMessagesModule);
RxDB.plugin(require('pouchdb-adapter-http'))
RxDB.plugin(require('pouchdb-adapter-idb'))

RxDB.QueryChangeDetector.enable()
RxDB.QueryChangeDetector.enableDebugging()

@Injectable()
export class DatabaseService {

    static db: RxDatabase = null

    loadedEntities: string[] = []
    loadedEntitesSubject: BehaviorSubject<Array<string>> = new BehaviorSubject([])

    constructor(
        @Inject("APP_ENTITIES") entities: Entity[],
        private configSrv: ConfigService,
        private http: HttpClient,
    ) {
        if (!DatabaseService.db) {
            this.init()
                .then(() => {
                    return this.http
                        .post(`${this.configSrv.get("remoteDB")}/_session`, {
                            name: "demo",
                            password: "demo",
                        }, {
                            withCredentials: true
                        })
                        .toPromise()
                        .then(() => {
                            this.setup(entities)
                        }, () => {
                            this.setup(entities)
                        })
                })
        } else {
            this.setup(entities)
        }
    }

    private async init() {
        DatabaseService.db = await RxDB
            .create({
                name: "db",
                adapter: "idb",
            })
    }

    public setup(entities: Entity[]) {
        if (!entities) { return }
        entities.forEach(entity => {
            DatabaseService.db
                .collection({
                    name: entity.name,
                    schema: entity.schema,
                })
                .then(collection => {
                    if (entity.sync) {
                        collection.sync({
                            remote: `${this.configSrv.get("remoteDB")}/${entity.name}/`
                        })
                    }
                    this.loadedEntities.push(entity.name)
                    this.loadedEntitesSubject.next(this.loadedEntities)
                })
        })
    }

    public get<T>(name: string): Promise<RxCollection<T>> {
        return new Promise((resolve, reject) => {
            this.loadedEntitesSubject
                .subscribe((loadedEntities) => {
                    const entity = loadedEntities.find(i => {
                        return i === name
                    })
                    if (entity) { resolve(DatabaseService.db[name]) }
                })
        })
    }

}
