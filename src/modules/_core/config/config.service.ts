import { BehaviorSubject } from 'rxjs/Rx'
import { Injectable } from '@angular/core'

@Injectable()
export class ConfigService {

    static config: any = null

    $account: BehaviorSubject<any> = new BehaviorSubject({
        alias: "X"
    })

    constructor() {
        if (ConfigService.config == null) {
            ConfigService.config = require("../../../balance.config.json")
        }
    }

    get(param: string) {
        return ConfigService.config[param]
    }
}
