import { Injectable } from '@angular/core'

import * as _ from 'lodash'

import { Profile } from '@blnc/core/profile/data/profile';
import { ProfileConfig } from '@blnc/core/profile/data/config';

@Injectable()
export class ProfileService {

    config: ProfileConfig = {}

    setup() {
        this.loadProfiles()
        this.config.selected = localStorage.getItem("@blnc/profiles-selected")
    }

    loadProfiles() {
        this.config.profiles = Object.keys(localStorage)
            .filter(item => {
                return item.indexOf("@blnc/profiles/") === 0
            })
            .map(item => {
                return JSON.parse(localStorage[item])
            })
        console.log(this.config)
    }

    clear() {
        localStorage.removeItem(`@blnc/profiles-selected`)
        this.config.profiles.forEach(profile => {
            localStorage.removeItem(`@blnc/profiles/${profile.alias}`)
        })
        this.config.selected = null
        this.config.profiles = []
    }

    select(name: string) {
        const profile = this.config.profiles.find(x => {
            return x.name === name
        })

        if (!profile) {
            throw new Error("Profile not found")
        }
        this.config.selected = profile.name
        localStorage.setItem(`@blnc/profiles-selected`, profile.name)
    }

    add(profile: Profile) {
        const unique = new Date
        profile.alias = `${this.slugify(profile.name)}-${unique.getTime()}`
        profile.createdAt = unique.toISOString()
        localStorage.setItem(`@blnc/profiles/${profile.alias}`, JSON.stringify(profile))
        this.config.profiles.push(profile)
    }

    get(): Profile {
        const profile = this.config.profiles.find(x => {
            return x.name === this.config.selected
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
}
