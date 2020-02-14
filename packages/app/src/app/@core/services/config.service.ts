import { Injectable } from '@angular/core'
import { Plugin, Profile } from '@balnc/shared'
import { ReadFile } from 'ngx-file-helpers'
import { LocalStorage } from 'ngx-store'
import { environment } from '../../../environments/environment'
import { Helpers } from '../../@shared/helpers'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  version: string = environment.version
  plugins: Plugin[] = environment.plugins
  build: any = environment.build

  @LocalStorage() isSidebarClosed: boolean = false

  @LocalStorage() roles: string[] = []

  @LocalStorage() selected: string = ''
  @LocalStorage() profiles: Profile[] = []

  menu: any

  get profile (): Profile {
    return this.profiles.find(p => p.key === this.selected)
  }

  get username (): string {
    const p = this.profile
    return p.remote.username || 'anonymous'
  }

  get enabled () {
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

  clearAll () {
    this.selected = null
    window.location.reload()
  }

  select (alias: string) {
    this.selected = alias
    window.location.reload()
  }

  save (profile: Profile): string {
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
