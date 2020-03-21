import { Injectable } from '@angular/core'
import { EnvBuild, Helpers, Profile } from '@balnc/shared'
import { ReadFile } from 'ngx-file-helpers'
import { LocalStorage } from 'ngx-store'
import { environment } from './../../../environments/environment'

@Injectable()
export class ConfigService {

  @LocalStorage() isSidebarClosed: boolean = false
  @LocalStorage() roles: string[] = []
  @LocalStorage() selected: string = ''
  @LocalStorage() profiles: Profile[] = []

  menu: any

  get version (): string {
    return environment.version
  }

  get build (): EnvBuild {
    return environment.build
  }

  get profile (): Profile {
    return this.profiles.find(p => p.key === this.selected)
  }

  get username (): string {
    return this.profile?.db?.username
  }

  get enabled () {
    return environment.plugins
      .filter(m => {
        return this.profile.plugins &&
          this.profile.plugins[m.key]
      })
  }

  setup () {
    console.log('[ConfigService]', 'Initializing with env:', environment)

    if (!this.profiles.length) {
      console.log('[ConfigService]', 'No profiles are available. Abording!')
      return
    }

    console.log('[ConfigService]', 'Profiles available:', this.profiles)

    if (!this.selected) {
      console.log('[ConfigService]', 'No selected profile. Auto select first', this.profiles[0].name)
      this.select(this.profiles[0].key)
    }

    if (this.profiles.findIndex(p => p.key === this.selected) === -1) {
      console.log('[ConfigService]', 'Selected profile not exist. Auto select first', this.profiles[0].name)
      this.select(this.profiles[0].key)
    }
  }

  getPackageConfig (id: string) {
    return this.profile.plugins[id]
  }

  clearAll () {
    this.selected = null
  }

  select (key: string) {
    this.selected = key
  }

  save (profile: Partial<Profile>): string {
    profile.key = profile.key || Helpers.uid()
    profile.created = profile.created || Date.now()
    let profiles = [...this.profiles]
    let index = this.profiles.findIndex(p => p.key === profile.key)
    if (index !== -1) {
      profiles.splice(index, 1)
    }
    profiles.push(profile as Profile)
    this.profiles = profiles
    return profile.key
  }

  remove (key: string) {
    let profiles = [...this.profiles]
    let index = this.profiles.findIndex(p => p.key === key)
    if (index !== -1) {
      profiles.splice(index, 1)
    }
    this.profiles = profiles
  }

  import (file: ReadFile) {
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
