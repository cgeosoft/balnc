import { Injectable } from '@angular/core'

import * as _ from 'lodash'

import { Profile } from '@balnc/core/profile/data/profile';
import { ProfileConfig } from '@balnc/core/profile/data/config';

@Injectable()
export class ProfileService {

    username: string;
    roles: string[] = []

    selected: string
    profiles: Profile[]

    private _module = "@balnc/profiles"

    setup() {
        this.load()
        this.selected = localStorage.getItem(`${this._module}/selected`)
        this.username = localStorage.getItem(`${this._module}/username`) || "none"
        this.roles = JSON.parse(localStorage.getItem(`${this._module}/roles`) || "[]")
    }

    login(username: string, roles: string[]) {
        this.username = username
        this.roles = roles
        localStorage.setItem(`${this._module}/username`, username)
        localStorage.setItem(`${this._module}/roles`, JSON.stringify(roles))
    }

    logout() {
        this.username = null
        this.roles = []
        localStorage.removeItem(`${this._module}/username`)
        localStorage.removeItem(`${this._module}/roles`)
    }

    load() {
        this.profiles = Object.keys(localStorage)
            .filter(item => {
                return item.indexOf(`${this._module}/profiles`) === 0
            })
            .map(item => {
                return JSON.parse(localStorage[item])
            })
        console.log("Loaded profiles", this.profiles)
    }

    clear() {
        localStorage.removeItem(`${this._module}/selected`)
        this.profiles.forEach(profile => {
            localStorage.removeItem(`${this._module}/profiles/${profile.alias}`)
        })
        this.selected = null
        this.profiles = []
    }

    select(alias: string) {
        const profile = this.profiles.find(x => {
            return x.alias === alias
        })

        if (!profile) {
            throw new Error("Profile not found")
        }
        this.selected = profile.alias
        localStorage.setItem(`${this._module}/selected`, profile.alias)
    }

    save(profile: Profile): string {
        if (!profile.alias) {
            const unique = new Date
            profile.alias = `${this.slugify(profile.name)}-${unique.getTime()}`
            profile.createdAt = unique.toISOString()
            this.setStore(`profiles/${profile.alias}`, profile)
            this.profiles.push(profile)
        } else {
            let existingProfile = this.get(profile.alias)
            existingProfile = Object.assign(existingProfile, profile)
            this.setStore(`profiles/${profile.alias}`, existingProfile)
        }
        return profile.alias
    }

    getCurrent(): Profile {
        return this.get(this.selected)
    }

    get(alias: string = null): Profile {
        const profile = this.profiles.find(x => {
            return x.alias === alias
        })
        return profile
    }

    delete(alias: string) {
        console.log(`${this._module}/profiles/${alias}`)
        if (this.selected === alias) {
            this.select = null
            localStorage.removeItem(`${this._module}/selected`)
        }

        localStorage.removeItem(`${this._module}/profiles/${alias}`)
        this.load()
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
