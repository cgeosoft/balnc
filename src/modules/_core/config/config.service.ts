import { BalanceNamespace } from './models/balance-namespace';
import { BalanceModule } from './models/balance-module';
import { BehaviorSubject } from 'rxjs/Rx'
import { Injectable } from '@angular/core'
import { ENV } from 'environments/environment';

@Injectable()
export class ConfigService {

    public static config: any = null
    public static modules: BalanceModule[] = null
    public static namespaces: BalanceNamespace[] = null

    $account: BehaviorSubject<any> = new BehaviorSubject({
        alias: "X"
    })

    constructor() {
        if (ConfigService.config == null) {
            ConfigService.config = ENV.configuration
        }
        if (ConfigService.modules == null) {
            ConfigService.modules = ENV.modules.modules
        }
        if (ConfigService.namespaces == null) {
            ConfigService.namespaces = ENV.modules.namespaces
        }
        console.log("ConfigService", ConfigService)
    }

    get(param: string) {
        return ConfigService.config[param]
    }
}
