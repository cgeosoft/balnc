import { Profile } from '@blnc/core/profile/data/profile'
import { ENV } from 'environments/environment'

import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router'
import { BehaviorSubject } from 'rxjs/Rx'
import { HelperService } from '@blnc/core/common/services/helper.service'
import { Route } from '@angular/compiler/src/core'

import * as _ from 'lodash'

import { BalanceModule } from '@blnc/core/common/models/balance-module'
import { BalanceNamespace } from '@blnc/core/common/models/balance-namespace'
import { DefaultProfileGuard } from '@blnc/core/profile/guards/profile.guard'
import { Injectable, Injector } from '@angular/core'
import { MainComponent } from '@blnc/teams/projects/components/_main/main.component'

@Injectable()
export class ConfigService {

    public version: any = null
    public config: any = null
    public modules: BalanceModule[] = null
    public namespaces: BalanceNamespace[] = null

    public profile: Profile = null

    setup() {
        this.config = ENV.configuration
        this.modules = ENV.modules.modules
        this.namespaces = ENV.modules.namespaces
        this.version = ENV.package.version
        console.log("ConfigService initializing with ENV:", ENV)
    }

    getModuleConfig(moduleId: string) {
        return this.profile.modules[moduleId]
    }

    getMainMenu(profile: Profile) {
        const menu = _.chain(this.modules)
            .filter(m => {
                return profile.modules &&
                    profile.modules[m.id] &&
                    profile.modules[m.id].enabled &&
                    m.menu
            })
            .map(m => {
                const l = _.cloneDeep(m.menu)
                l.path = `/${l.path}`
                l.icon = HelperService.getIconClass(l.icon, true)
                return l
            })
            .value()
        return menu
    }
}
