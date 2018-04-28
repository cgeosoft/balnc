import { Injector } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Entity } from "@blnc/core/common/models/entity";
import { ConfigService } from "@blnc/core/common/services/config.service";
import { DatabaseService } from "@blnc/core/common/services/database.service";

export abstract class BaseService implements Resolve<any> {

    protected configService: ConfigService
    protected dbService: DatabaseService

    protected _module: string
    protected _entities: Entity[]

    protected _config: any
    protected _data: any

    constructor(injector: Injector) {
        this.configService = injector.get(ConfigService)
        this.dbService = injector.get(DatabaseService)
    }

    public async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
        await this.setup()
        return true
    }

    private async setup<T>() {
        this._config = this.configService.getModuleConfig(this._module)
        await this.dbService.loadEntities(this._entities)
        this._entities.forEach(async e => {
            this._data[e.name] = await this.dbService.get<T>(e.name)
        })
    }

    public async all(entity: string, params: any = {}) {
        Object.assign(params, { query: {} })
        return await this._data[entity].find(params.query).exec()
    }

    public async one(entity: string, id: string) {
        return await this._data[entity].findOne(id).exec()
    }
}
