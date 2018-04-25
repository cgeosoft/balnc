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

    public config: any = null
    public modules: BalanceModule[] = null
    public namespaces: BalanceNamespace[] = null

    public profile: Profile = null

    setup() {
        this.config = ENV.configuration
        this.modules = ENV.modules.modules
        this.namespaces = ENV.modules.namespaces
        console.log("ConfigService initializing with ENV:", ENV)
    }

    getModuleConfig(moduleId: string) {
        // const moduleItem = this.modules.find(x => x.id === moduleId)
        // const moduleConfig = (moduleItem) ? moduleItem.config : {}
        // const profileConfig = this.profile.modules[moduleId] || {}
        // return Object.assign(moduleConfig, profileConfig)

        return this.profile.modules[moduleId]
    }

    getMainMenu(profile: Profile) {
        console.log("profile", profile, this.modules)
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
        console.log("menu", menu)
        return menu
    }
}
