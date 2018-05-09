import { reduce } from 'rxjs/operators/reduce';
import { Profile } from '@balnc/core/profile/data/profile'
import { ENV } from 'environments/environment'

import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router'
import { BehaviorSubject } from 'rxjs/Rx'
import { HelperService } from '@balnc/common/services/helper.service'
import { Route } from '@angular/compiler/src/core'

import * as _ from 'lodash'

import { BalncModule } from '@balnc/common/models/balnc-module'
import { DefaultProfileGuard } from '@balnc/core/profile/guards/profile.guard'
import { Injectable, Injector } from '@angular/core'
import { IsNullPipe } from 'ngx-pipes';

@Injectable()
export class ConfigService {

    public version: any = null
    public config: any = null
    public modules: BalncModule[] = null

    public profile: Profile = null

    setup() {
        this.config = ENV.configuration
        this.modules = ENV.modules
        this.version = ENV.version
        console.log("[ConfigService]", "Initializing with ENV:", ENV)
    }

    getModuleConfig(moduleId: string) {
        return this.profile.modules[moduleId]
    }

    getMainMenu(profile: Profile) {
        const menu = this.modules
            .filter(m => {
                return profile.modules &&
                    profile.modules[m.id] &&
                    profile.modules[m.id].enabled &&
                    m.menu
            })
            .map(m => {
                return m.menu.filter(x => {
                    return profile.modules[m.id].menu[x.id]
                })
            })
            .reduce((supermenu, menus) => {
                return supermenu.concat(menus);
            }, [])
            .map(m => {
                const v = { ...m }
                v.icon = HelperService.getIcon(m.icon)
                return v
            })
        return menu
    }
}
