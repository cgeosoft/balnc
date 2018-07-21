import { Injectable, Injector } from '@angular/core'
import { reduce } from 'rxjs/operators'
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router'
import { Route } from '@angular/compiler/src/core'

import * as _ from 'lodash'

import { HelperService } from '../services/helper.service'

import { BalncModule } from '../models/balnc-module'
import { Profile } from '../models/profile'

@Injectable()
export class ConfigService {

    public version: any = null
    public config: any = null
    public modules: BalncModule[] = null

    public profile: any = null

    public username: string
    public roles: string[] = []

    public selected: string
    public profiles: Profile[]

    private _module = "@balnc/profiles"


    setup(env: any) {
        this.config = env.configuration
        this.modules = env.modules
        this.version = env.version
        console.log("[ConfigService]", "Initializing with env:", env)
        this.load()
        this.selected = localStorage.getItem(`${this._module}/selected`)
        this.username = localStorage.getItem(`${this._module}/username`) || "none"
        this.roles = JSON.parse(localStorage.getItem(`${this._module}/roles`) || "[]")
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
                return supermenu.concat(menus)
            }, [])
            .map(m => {
                const v = { ...m }
                v.icon = HelperService.getIcon(m.icon)
                return v
            })
        return menu
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

    clearAllProfiles() {
        localStorage.removeItem(`${this._module}/selected`)
        this.profiles.forEach(profile => {
            localStorage.removeItem(`${this._module}/profiles/${profile.alias}`)
        })
        this.selected = null
        this.profiles = []
        window.location.reload()
    }

    selectProfile(alias: string) {
        const profile = this.profiles.find(x => {
            return x.alias === alias
        })

        if (!profile) {
            throw new Error("Profile not found")
        }
        this.selected = profile.alias
        localStorage.setItem(`${this._module}/selected`, profile.alias)
        window.location.reload()
    }

    saveProfile(profile: Profile): string {
        if (!profile.alias) {
            const unique = new Date
            profile.alias = `${this.slugify(profile.name)}-${unique.getTime()}`
            profile.createdAt = unique.toISOString()
            this.setStore(`profiles/${profile.alias}`, profile)
            this.profiles.push(profile)
        } else {
            let existingProfile = this.getProfile(profile.alias)
            existingProfile = Object.assign(existingProfile, profile)
            this.setStore(`profiles/${profile.alias}`, existingProfile)
        }
        return profile.alias
    }

    getProfile(alias: string = null): Profile {
        alias = alias || this.selected
        const profile = this.profiles.find(x => {
            return x.alias === alias
        })
        return profile
    }

    deleteProfile(alias: string) {
        console.log(`${this._module}/profiles/${alias}`)
        if (this.selected === alias) {
            this.selected = null
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
            .replace(/-+$/, '')            // Trim - from end of text
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
