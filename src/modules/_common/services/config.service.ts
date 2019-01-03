import { Injectable } from '@angular/core'
import { environment } from 'environments/environment'
import { ReadFile } from 'ngx-file-helpers'
import { LocalStorage } from 'ngx-store'

import { BModule } from '../models/bmodules'
import { Profile } from '../models/profile'
import { HelperService } from './helper.service'

@Injectable()
export class ConfigService {

  public version: string = environment.version
  public config: any = environment
  public bmodules: BModule[] = environment.bmodules

  @LocalStorage() sidebarClosed: boolean = false

  @LocalStorage() roles: string[] = []

  @LocalStorage() selected: string = ''
  @LocalStorage() profiles: Profile[] = []

  public profile: Profile

  constructor (
    public helperService: HelperService
  ) {
    console.log('[ConfigService]', 'Initializing with env:', environment)
    console.log('[ConfigService]', 'Profiles available:', this.profiles)

    this.parsePackages()

    if (this.selected) {
      this.profile = this.profiles.find(p => p.id === this.selected)
      console.log('[ConfigService]', `Profile ${this.selected} loaded`)
    }
  }

  parsePackages () {
    this.bmodules = this.bmodules.map(p => {
      const v = { ...p }
      v.picon = this.helperService.getIcon(v.icon)
      v.menu = v.menu.map(m => {
        m.icon = this.helperService.getIcon(m.icon)
        return m
      })
      return v
    })
  }

  getPackageConfig (id: string) {
    return this.profile.bmodules[id]
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

  saveBModule (profile: Profile): string {
    const unique = new Date()
    profile.id = profile.id || `${unique.getTime()}`
    profile.createdAt = profile.createdAt || unique.toISOString()
    let profiles = [...this.profiles]
    let index = this.profiles.findIndex(p => p.id === profile.id)
    if (index !== -1) {
      profiles.splice(index, 1)
    }
    profiles.push(profile)
    this.profiles = profiles
    return profile.id
  }

  getProfile (alias: string = null): Profile {
    alias = alias || this.selected
    alias = alias || this.profiles[0].id
    let index = this.profiles.findIndex(p => p.id === alias)
    return this.profiles[index]
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
