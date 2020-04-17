import { Injectable } from '@angular/core'
import { EnvBuild, Helpers, Workspace } from '@balnc/shared'
import { ReadFile } from 'ngx-file-helpers'
import { LocalStorage } from 'ngx-store'
import { v4 as uuidv4 } from 'uuid'
import { environment } from './../../../environments/environment'
import { IntegrationConfig, User, WORKSPACE_VERSION } from './../../@shared/models/workspace'
@Injectable()
export class ConfigService {

  @LocalStorage() isSidebarClosed: boolean = false
  @LocalStorage() roles: string[] = []
  @LocalStorage() activated: string = ''
  @LocalStorage() workspaces: Workspace[] = []
  @LocalStorage() username: string = null

  users: User[]
  integrations?: { [key: string]: IntegrationConfig }

  menu: any

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
    return this.users?.find(u => u.username === this.username)
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

  save (workspace: Partial<Workspace>): string {
    workspace.key = workspace.key || uuidv4().replace(/-/g,'')
    workspace.name = workspace.name || Helpers.generateName()
    workspace.created = workspace.created || Date.now()
    let workspaces = [...this.workspaces]
    let index = this.workspaces.findIndex(p => p.key === workspace.key)
    if (index !== -1) {
      workspaces.splice(index, 1)
    }
    workspaces.push(workspace as Workspace)
    this.workspaces = workspaces
    return workspace.key
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

}
