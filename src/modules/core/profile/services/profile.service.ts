import { Injectable } from '@angular/core'

import * as _ from 'lodash'

import { Profile } from '@blnc/core/profile/data/profile';
import { ProfileConfig } from '@blnc/core/profile/data/config';

@Injectable()
export class ProfileService {

    _module = "@blnc/profiles"
    config: ProfileConfig = {}

    setup() {
        this.loadProfiles()
        this.config.selectedProfile = localStorage.getItem("@blnc/profiles/selected-profile")
    }

    loadProfiles() {
        this.config.profiles = Object.keys(localStorage)
            .filter(item => {
                return item.indexOf("@blnc/profiles/profiles") === 0
            })
            .map(item => {
                return JSON.parse(localStorage[item])
            })
        console.log(this.config.profiles)
    }

    clear() {
        localStorage.removeItem(`@blnc/profiles/selected-profile`)
        this.config.profiles.forEach(profile => {
            localStorage.removeItem(`@blnc/profiles/profiles/${profile.alias}`)
        })
        this.config.selectedProfile = null
        this.config.profiles = []
    }

    select(alias: string) {
        const profile = this.config.profiles.find(x => {
            return x.alias === alias
        })

        if (!profile) {
            throw new Error("Profile not found")
        }
        this.config.selectedProfile = profile.alias
        localStorage.setItem("@blnc/profiles/selected-profile", profile.alias)
    }

    add(profile: Profile) {
        const unique = new Date
        profile.alias = `${this.slugify(profile.name)}-${unique.getTime()}`
        profile.createdAt = unique.toISOString()
        this.setStore(`profiles/${profile.alias}`, profile)
        this.config.profiles.push(profile)
    }

    getCurrent(): Profile {
        return this.get(this.config.selectedProfile)
    }

    get(alias: string = null): Profile {
        const profile = this.config.profiles.find(x => {
            return x.alias === alias
        })
        return profile
    }

    private slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }

    private getStore(name) {
        const item = localStorage.getItem(`${this._module}/${name}`)
        return (item) ? JSON.parse(item) : null
    }

    private setStore(name, value) {
        const item = JSON.stringify(value)
        return localStorage.setItem(`${this._module}/${name}`, item)
    }
}