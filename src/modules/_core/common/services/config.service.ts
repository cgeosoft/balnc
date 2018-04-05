import { ENV } from 'environments/environment';

import { BehaviorSubject } from 'rxjs/Rx'
import { Router } from '@angular/router';
import { HelperService } from '@blnc/core/common/services/helper.service';
import { Route } from '@angular/compiler/src/core';

import * as _ from 'lodash'

import { BalanceModule } from '@blnc/core/common/models/balance-module';
import { BalanceNamespace } from '@blnc/core/common/models/balance-namespace';

export class ConfigService {

    public static config: any = null
    public static modules: BalanceModule[] = null
    public static namespaces: BalanceNamespace[] = null

    profile$: BehaviorSubject<any> = new BehaviorSubject({
        alias: "X"
    })

    static loadConfig() {
        ConfigService.config = ENV.configuration
        ConfigService.modules = ENV.modules.modules
        ConfigService.namespaces = ENV.modules.namespaces
    }

    static getMainMenu() {
        const menu = _.chain(ConfigService.modules)
            .filter(m => (m.isActive && m.hasMenu))
            .map(m => {
                m.path = `/${m.path}`
                m.icon = HelperService.getIconClass(m.icon, true)
                return m
            })
            .value()

        return menu
    }

    static enableRoutes(router: Router) {
        const routes: Route[] = _.chain(ConfigService.modules)
            .filter(m => (m.isActive && m.hasMenu))
            .map(m => {
                return {
                    path: m.path,
                    loadChildren: `${m.namespace}/${m.mainModule}`
                }
            })
            .value()

        const config = router.config
            .filter(x => x.component)
            .find(x => x.component.name === "MainComponent")

        routes.forEach(route => {
            config.children.push(route)
        })

        router.resetConfig(router.config)

        console.log(router.config, routes)
    }

}
