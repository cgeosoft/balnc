import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Plugin, Profile } from '@balnc/shared'
import { ReadFile } from 'ngx-file-helpers'
import { LocalStorage } from 'ngx-store'
import { environment } from '../../../environments/environment'
import { Helpers } from '../../@shared/helpers'

@Injectable()
export class ConfigService {

  version: string = environment.version
  plugins: Plugin[] = environment.plugins
  build: any = environment.build

  @LocalStorage() isSidebarClosed: boolean = false

  @LocalStorage() roles: string[] = []

  @LocalStorage() selected: string = ''
  @LocalStorage() profiles: Profile[] = []

  menu: any

  constructor (
    private router: Router
  ) { }

  get profile (): Profile {
    return this.profiles.find(p => p.key === this.selected)
  }

  get username (): string {
    const p = this.profile
    return p.remote.username || 'anonymous'
  }

  get enabledPlugins () {
    return this.plugins
      .filter(m => {
        return this.profile.plugins &&
          this.profile.plugins[m.id]
      })
  }

  setup () {
    console.log('[ConfigService]', 'Initializing with env:', environment)
    console.log('[ConfigService]', 'Profiles available:', this.profiles)

    this.plugins = this.plugins.map(p => {
      const v = { ...p }
      v.picon = Helpers.getIcon(v.icon)
      return v
    })

    if (!this.profiles.length) {
      // await this.router.navigate(['/setup'])
      return
    }

    const profileIndex = this.profiles.findIndex(p => p.key === this.selected)
    if (!this.selected || profileIndex === -1) {
      this.selected = this.profiles[0].key
    }
  }

  getPackageConfig (id: string) {
    return this.profile.plugins[id]
  }

  clearAllProfiles () {
    this.selected = null
    window.location.reload()
  }

  selectProfile (alias: string) {
    this.selected = alias
    window.location.reload()
  }

  removeProfile (profileId) {
    let profiles = [...this.profiles]
    let index = this.profiles.findIndex(p => p.key === profileId)
    if (index !== -1) {
      profiles.splice(index, 1)
    }
    this.profiles = profiles
  }

  saveProfile (profile: Profile): string {
    profile.key = profile.key || Helpers.uid()
    profile.createdAt = profile.createdAt || Date.now()
    let profiles = [...this.profiles]
    let index = this.profiles.findIndex(p => p.key === profile.key)
    if (index !== -1) {
      profiles.splice(index, 1)
    }
    profiles.push(profile)
    this.profiles = profiles
    return profile.key
  }

  deleteProfile (alias: string) {
    let profiles = [...this.profiles]
    let index = this.profiles.findIndex(p => p.key === alias)
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
