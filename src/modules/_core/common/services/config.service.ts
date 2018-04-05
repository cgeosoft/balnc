import { ENV } from 'environments/environment';

import { BehaviorSubject } from 'rxjs/Rx'
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { HelperService } from '@blnc/core/common/services/helper.service';
import { Route } from '@angular/compiler/src/core';

import * as _ from 'lodash'

import { BalanceModule } from '@blnc/core/common/models/balance-module';
import { BalanceNamespace } from '@blnc/core/common/models/balance-namespace';
import { Injectable, Injector } from '@angular/core';
import { DefaultProfileGuard } from '@blnc/core/profile/guards/profile.guard';
import { MainComponent } from '@blnc/teams/projects/components/_main/main.component';

@Injectable()
export class ConfigService {

    public config: any = null
    public modules: BalanceModule[] = null
    public namespaces: BalanceNamespace[] = null

    profile$: BehaviorSubject<any> = new BehaviorSubject({
        alias: "X"
    })

    setup() {
        this.config = ENV.configuration
        console.log("this.config", this.config)
        this.modules = ENV.modules.modules
        console.log("this.modules", this.modules)
        this.namespaces = ENV.modules.namespaces
        console.log("this.namespaces", this.namespaces)
    }

    getMainMenu() {
        const menu = _.chain(this.modules)
            .filter(m => (m.isActive && m.hasMenu))
            .map(m => {
                const l = _.cloneDeep(m)
                l.path = `/${l.path}`
                l.icon = HelperService.getIconClass(l.icon, true)
                return l
            })
            .value()
        return menu
    }
}
