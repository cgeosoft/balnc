import { Injectable } from '@angular/core'
import { LocalStorage } from 'ngx-store'

import { environment } from 'environments/environment'

import { HelperService } from '../services/helper.service'
import { BalncModule } from '../models/balnc-module'
import { Profile } from '../models/profile'

@Injectable()
export class ConfigService {

  public version: string = environment.version
  public config: any = environment
  public packages: BalncModule[] = environment.packages

  @LocalStorage() roles: string[] = []

  @LocalStorage() selected: string = ''
  @LocalStorage() profiles: { [key: string]: Profile } = {}

  public profile: Profile

  setup () {
    console.log('[ConfigService]', 'Initializing with env:', environment)
    console.log('[ConfigService]', 'Profiles available:', Object.values(this.profiles))

    if (this.selected) {
      this.profile = this.profiles[this.selected]
      console.log('[ConfigService]', `Profile ${this.selected} laoded`)
    }
  }

  getModuleConfig (moduleId: string) {
    return this.profile.modules[moduleId]
  }

  getMainMenu () {
    if (!this.profile) {
      return []
    }
    const menu = this.packages
      .filter(m => {
        return this.profile.modules &&
          this.profile.modules[m.id] &&
          this.profile.modules[m.id].enabled
      })
      .map(m => {
        const v = { ...m }
        v.icon = HelperService.getIcon(m.icon)
        return v
      })
    return menu
  }

  clearAllProfiles () {
    this.selected = null
    this.profiles = {}
    window.location.reload()
  }

  selectProfile (alias: string) {
    this.selected = alias
    window.location.reload()
  }

  createProfile (profile: Profile) {
    let profiles = this.profiles
    const unique = new Date()
    profile.alias = `${unique.getTime()}`
    profile.createdAt = unique.toISOString()
    profiles[profile.alias] = profile
    this.profiles = profiles
    return profile.alias
  }

  saveProfile (profile: Profile): string {
    let profiles = this.profiles
    profiles[profile.alias] = Object.assign(profiles[profile.alias], profile)
    this.profiles = profiles
    if (this.selected === profile.alias) {
      window.location.reload()
    }
    return profile.alias
  }

  getProfile (alias: string = null): Profile {
    alias = alias || this.selected
    return this.profiles[alias]
  }

  deleteProfile (alias: string) {
    delete this.profiles[alias]
  }
}
