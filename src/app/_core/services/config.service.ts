import { Injectable } from '@angular/core';
import { Plugin, Profile } from '@balnc/shared';
import { ReadFile } from 'ngx-file-helpers';
import { LocalStorage } from 'ngx-store';
import { environment } from '../../../environments/environment';
import { Helpers } from '../../_shared/helpers';

@Injectable()
export class ConfigService {

  version: string = environment.version
  plugins: Plugin[] = environment.plugins
  enabledPlugins: Plugin[] = []

  @LocalStorage() isSidebarClosed: boolean = false

  @LocalStorage() roles: string[] = []

  @LocalStorage() selected: string = ''
  @LocalStorage() profiles: Profile[] = []

  profile: Profile = {}

  menu: any

  constructor () {
    console.log('[ConfigService]', 'Initializing with env:', environment)
    console.log('[ConfigService]', 'Profiles available:', this.profiles)

    this.parsePackages()

    if (this.selected) {
      this.profile = this.profiles.find(p => p.id === this.selected)
      console.log('[ConfigService]', `Profile ${this.selected} loaded`)
    }

    this.setEnabledPlugins()
  }

  parsePackages () {
    this.plugins = this.plugins.map(p => {
      const v = { ...p }
      v.picon = Helpers.getIcon(v.icon)
      return v
    })
  }

  setEnabledPlugins () {
    this.enabledPlugins = this.plugins
      .filter(m => {
        return this.profile.plugins &&
          this.profile.plugins[m.id]
      })
  }

  getPackageConfig (id: string) {
    return this.profile.plugins[id]
  }

  clearAllProfiles () {
    this.selected = null
    // this.profiles = []
    window.location.reload()
  }

  selectProfile (alias: string) {
    this.selected = alias
    window.location.reload()
  }

  removeProfile (profileId) {
    let profiles = [...this.profiles]
    let index = this.profiles.findIndex(p => p.id === profileId)
    if (index !== -1) {
      profiles.splice(index, 1)
    }
    this.profiles = profiles
  }

  saveProfile (profile: Profile): string {
    profile.id = profile.id || Helpers.uid()
    profile.createdAt = profile.createdAt || Date.now()
    let profiles = [...this.profiles]
    let index = this.profiles.findIndex(p => p.id === profile.id)
    if (index !== -1) {
      profiles.splice(index, 1)
    }
    profiles.push(profile)
    this.profiles = profiles
    this.setEnabledPlugins()
    return profile.id
  }

  getProfile (alias: string = null): Profile {
    alias = alias || this.selected
    alias = alias || this.profiles[0].id
    const profile = this.profiles.find(p => p.id === alias)
    profile.plugins = profile.plugins || {}
    return profile
  }

  deleteProfile (alias: string) {
    let profiles = [...this.profiles]
    let index = this.profiles.findIndex(p => p.id === alias)
    profiles.splice(index, 1)
    this.profiles = profiles
  }

  importFile (file: ReadFile) {
    try {
      const data = file.content.split(',')[1]
      const profileStr = atob(data)
      const profile: Profile = JSON.parse(profileStr)
      return profile
    } catch (error) {
      console.log('[ProfileComponent]', 'Error' + error)
      return null
    }
  }

}
