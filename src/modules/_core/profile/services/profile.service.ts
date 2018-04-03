import { Injectable } from '@angular/core'

import * as _ from 'lodash'

import { ConfigService } from '@blnc/core/config/config.service'

@Injectable()
export class ProfileService {

    profile: any

    constructor(
        private configService: ConfigService,
    ) {
        this.profile = localStorage.getItem("profile")
    }

    hasProfile(): boolean {
        return _.isNull(this.profile)
    }

    async selectProfile(alias: string) {
        // const profiles = await this.getProfile()

        // const profile = profiles.find(x => {
        //     return x.alias === alias
        // })

        // // this.configService.profile$.next(profile)

        // if (this.selectProfile) {
        //     localStorage.setItem("profile", alias)
        //     // this.dbService.setNamespace(alias)
        // }
    }
}
