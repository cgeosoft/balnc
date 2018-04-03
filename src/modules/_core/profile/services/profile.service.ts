import { Injectable } from '@angular/core'

import * as _ from 'lodash'

import { Profile } from '@blnc/core/profile/data/profile';
import { ProfileConfig } from '@blnc/core/profile/data/config';

@Injectable()
export class ProfileService {

    static lsName = "profiles-config"
    static config: ProfileConfig

    static load() {
        let configRaw = localStorage.getItem(ProfileService.lsName)
        if (!configRaw) {
            configRaw = "{}"
        }
        this.config = JSON.parse(configRaw)
    }

    static save() {
        localStorage.setItem(ProfileService.lsName, JSON.stringify(ProfileService.config))
    }

    static clear() {
        ProfileService.config = {}
        localStorage.removeItem(ProfileService.lsName)
    }

    static selectProfile(name: string) {
        const profile = ProfileService.config.profiles.find(x => {
            return x.name === name
        })

        if (!profile) {
            throw new Error("Profile not found")
        }
        ProfileService.config.selected = profile.name
        ProfileService.save()
    }

    static addProfile(profile: Profile) {
        ProfileService.config.profiles.push(profile)
        ProfileService.save()
    }

    static getSelectedProfile(): Profile {
        const profile = ProfileService.config.profiles.find(x => {
            return x.name === ProfileService.config.selected
        })
        if (!profile) {
            throw new Error("Profile not found")
        }
        return profile
    }
}
