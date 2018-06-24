import { Injectable, Injector } from '@angular/core'
import { reduce } from 'rxjs/operators';
// import { ENV } from 'environments/environment'
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router'
import { Route } from '@angular/compiler/src/core'


import * as _ from 'lodash'

import { HelperService } from '../services/helper.service'
import { BalncModule } from '../models/balnc-module'

@Injectable()
export class ConfigService {

    public version: any = null
    public config: any = null
    public modules: BalncModule[] = null

    public profile: any = null

    setup(env: any) {
        this.config = env.configuration
        this.modules = env.modules
        this.version = env.version
        console.log("[ConfigService]", "Initializing with env:", env)
    }

    getModuleConfig(moduleId: string) {
        return this.profile.modules[moduleId]
    }

    getMainMenu(profile) {
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
