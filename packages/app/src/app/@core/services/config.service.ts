import { Injectable } from '@angular/core'
import { ReadFile } from 'ngx-file-helpers'
import { LocalStorage } from 'ngx-store'
import { v4 as uuidv4 } from 'uuid'
import { Helpers } from '../../@shared/helpers'
import { EnvBuild } from '../../@shared/models/env-build'
import { Integration } from '../models/integration'
import { User } from '../models/user'
import { Workspace, WORKSPACE_VERSION } from '../models/workspace'
import { environment } from './../../../environments/environment'

@Injectable()
export class ConfigService {

  @LocalStorage() isSidebarClosed: boolean = false
  @LocalStorage() roles: string[] = []
  @LocalStorage() activated: string = ''
  @LocalStorage() workspaces: Workspace[] = []
  @LocalStorage() userId: string = null

  users: User[]
  integrations?: { [key: string]: Integration }

  menu: any
  userAvatars: { [key: string]: string }

  get usernames () {
    return this.users.reduce((l, i) => {
      l[i._id] = i.username
      return l
    }, {})
  }

  get version (): string {
    return environment.version
  }

  get build (): EnvBuild {
    return environment.build
  }

  get workspace (): Workspace {
    return this.workspaces.find(p => p.key === this.activated)
  }

  get user (): User {
    return this.users?.find(u => u._id === this.userId)
  }

  constructor () {
    this.workspaces = this.workspaces.filter(x => x.version || x.version > WORKSPACE_VERSION)
  }

  setup () {
    console.log('[ConfigService]', 'Initializing with env:', environment)

    if (!this.workspaces.length) {
      console.log('[ConfigService]', 'No workspaces are available. Abording!')
      return
    }

    console.log('[ConfigService]', 'Workspaces available:', this.workspaces)

    if (!this.activated) {
      console.log('[ConfigService]', 'No selected workspace. Auto select first', this.workspaces[0].key)
      this.activated = this.workspaces[0].key
    }

    if (this.workspaces.findIndex(p => p.key === this.activated) === -1) {
      console.log('[ConfigService]', 'Selected workspace not exist. Auto select first', this.workspaces[0].key)
      this.activated = this.workspaces[0].key
    }
  }

  create (data: Partial<Workspace>): string {
    const ws: Partial<Workspace> = {
      ...{
        key: uuidv4().replace(/-/g, ''),
        name: Helpers.generateName(),
        created: Date.now()
      },
      ...data
    }
    this.workspaces.push(ws as Workspace)
    this.workspaces = [...this.workspaces]
    return ws.key
  }

  update (data: Partial<Workspace>): string {
    let i = this.workspaces.findIndex(p => p.key === data.key)
    this.workspaces[i] = data as Workspace
    this.workspaces = [...this.workspaces]
    return data.key
  }

  remove (key: string) {
    let workspaces = [...this.workspaces]
    let index = this.workspaces.findIndex(p => p.key === key)
    if (index !== -1) {
      workspaces.splice(index, 1)
    }
    this.workspaces = workspaces
  }

  import (file: ReadFile) {
    try {
      const data = file.content.split(',')[1]
      const workspaceStr = atob(data)
      const workspace: Workspace = JSON.parse(workspaceStr)
      return workspace
    } catch (error) {
      return null
    }
  }

  export () {
    let a = document.createElement('a')
    let file = new Blob([JSON.stringify(this.workspace, null, 2)], { type: 'application/json' })
    a.href = URL.createObjectURL(file)
    a.download = `${(new Date()).toDateString()} - ${this.workspace.key}.json`
    a.click()
  }

}
