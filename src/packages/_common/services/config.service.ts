import { Injectable } from '@angular/core'
import { LocalStorage } from 'ngx-store';

import { HelperService } from '../services/helper.service'
import { BalncModule } from '../models/balnc-module'
import { Profile } from '../models/profile'

@Injectable()
export class ConfigService {

    public version: any = null
    public config: any = null
    public modules: BalncModule[] = null

    @LocalStorage() username: string
    @LocalStorage() roles: string[] = []

    @LocalStorage() selected: string = ''
    @LocalStorage() profiles: { [key: string]: Profile } = {}

    public profile: Profile

    setup(env: any) {
        this.config = env.configuration
        this.modules = env.modules
        this.version = env.version

        console.log("[ConfigService]", "Initializing with env:", env)
        console.log("[ConfigService]", "Profiles available:", Object.values(this.profiles))

        if (this.selected) {
            this.profile = this.profiles[this.selected]
            console.log("[ConfigService]", `Profile ${this.selected} laoded`)
        }
    }

    getModuleConfig(moduleId: string) {
        return this.profile.modules[moduleId]
    }

    getMainMenu() {
        const menu = this.modules
            .filter(m => {
                return this.profile.modules &&
                    this.profile.modules[m.id] &&
                    this.profile.modules[m.id].enabled &&
                    m.menu
            })
            .map(m => {
                return m.menu.filter(x => {
                    return this.profile.modules[m.id].menu[x.id]
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
    }

    logout() {
        this.username = null
        this.roles = []
    }

    clearAllProfiles() {
        this.selected = null
        this.profiles = {}
        window.location.reload()
    }

    selectProfile(alias: string) {
        this.selected = alias
        window.location.reload()
    }

    saveProfile(profile: Profile): string {
        let profiles = this.profiles
        if (!profile.alias) {
            const unique = new Date
            profile.alias = `${this.slugify(profile.name)}-${unique.getTime()}`
            profile.createdAt = unique.toISOString()
            profiles[profile.alias] = profile
        } else {
            profiles[profile.alias] = Object.assign(profiles[profile.alias], profile)
        }
        this.profiles = profiles

        if(this.selected === profile.alias){
            window.location.reload()
        }

        return profile.alias
    }

    getProfile(alias: string = null): Profile {
        alias = alias || this.selected
        return this.profiles[alias]
    }

    deleteProfile(alias: string) {
        delete this.profiles[alias]
    }

    private slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '')            // Trim - from end of text
    }
}
