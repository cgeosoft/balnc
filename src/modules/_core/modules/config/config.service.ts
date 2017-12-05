import { Injectable } from '@angular/core'

@Injectable()
export class ConfigService {

    static config: any = null

    constructor() {
        if (ConfigService.config == null) {
            ConfigService.config = require("../../../../balance.config.json")
        }
    }

    get(param: string) {
        return ConfigService.config[param]
    }
}
