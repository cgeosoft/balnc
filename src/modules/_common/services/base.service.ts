import { RxCollection, RxDocument } from 'rxdb';
import { Injector } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Entity } from "@balnc/common/models/entity";
import { ConfigService } from "@balnc/common/services/config.service";
import { DatabaseService } from "@balnc/common/services/database.service";
import { BalncModuleConfig } from '@balnc/common/models/balnc-module';

export abstract class BaseService implements Resolve<any> {

    public configService: ConfigService
    public dbService: DatabaseService

    public _module: string
    public _entities: Entity[]

    public config: BalncModuleConfig
    public settings: any
    public _data: RxCollection<RxDocument<any>>[] = []

    constructor(injector: Injector) {
        this.configService = injector.get(ConfigService)
        this.dbService = injector.get(DatabaseService)
    }

    public async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
        console.log("[BaseService]", "resolving...")
        await this.setup()
        return true
    }

    public async setup() {
        this.config = this.configService.getModuleConfig(this._module)
        this.settings = this.config.settings
        await this.dbService.load(this._entities)
        this._entities.forEach(async e => {
            this._data[e.name] = await this.dbService.get(e.name)
        })
        console.log("[BaseService]", "setup", this._module)
    }

    public async all<T>(entity: string, params: any = {}) {
        params = Object.assign(params, { query: {} })
        const dd = this._data[entity] as RxCollection<T>
        if (!dd) { return [] }
        const res = await dd.find(params.query).exec()
        return res as T[]
    }

    public async one<T>(entity: string, id: string) {
        return await this._data[entity].findOne(id).exec() as T
    }

    public async add<T>(entity: string, item: T) {
        const col = this._data[entity] as RxCollection<T>
        await col.newDocument(item).save()
    }

    public getStore(name) {
        const item = localStorage.getItem(`${this._module}/${name}`)
        return (item) ? JSON.parse(item) : {}
    }

    public setStore(name, value) {
        let item = null
        if (typeof value === "object") {
            item = JSON.stringify(value)
        } else {
            item = value
        }
        return localStorage.setItem(`${this._module}/${name}`, item)
    }

    public clearStore(name) {
        return localStorage.removeItem(`${this._module}/${name}`)
    }
}
