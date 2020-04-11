import { HttpClient } from '@angular/common/http'
import { Component, HostBinding, OnInit } from '@angular/core'
import { ConfigService, RxDBService } from '@balnc/core'
import { DbConfig, ServerConfig } from '@balnc/shared'
import { ToastrService } from 'ngx-toastr'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-settings-remote',
  templateUrl: './remote.component.html'
})
export class RemoteComponent implements OnInit {
  @HostBinding('class') errorClass

  seperator
  wizard = {
    active: 'server',
    steps: [
      { key: 'server', label: 'Server' },
      { key: 'auth', label: 'Authentication' },
      { key: 'link', label: 'Link' },
      { key: 'finish', label: 'Finish' }
    ]
  }
  loading = {
    verifing: false,
    auth: false
  }
  authView = 'login'
  servers = environment.servers

  serverConfig: ServerConfig = {}
  dbConfig: DbConfig = {}

  get workspace () {
    return this.configService.workspace
  }

  get isDemo () {
    if (!this.dbConfig?.host) return false
    const demoServer = environment.servers.find(s => s.label === 'Demo Server')
    return demoServer.url === this.dbConfig?.host
  }

  constructor (
    private http: HttpClient,
    private toastr: ToastrService,
    private configService: ConfigService,
    private rxdbService: RxDBService
  ) { }

  ngOnInit () {
    this.serverConfig = { ...this.workspace.server }
    this.serverConfig.type = this.serverConfig.type || null

    this.dbConfig = { ...this.workspace.db }
    this.dbConfig.type = this.dbConfig.type || null
  }

  async applyServer () {
    this.workspace.server = { ...this.serverConfig }
    this.configService.save(this.workspace)
    await this.rxdbService.setup()
  }

  async applyDb () {
    this.workspace.db = {
      ...this.dbConfig
    }
    this.configService.save(this.workspace)
    await this.rxdbService.setup()
  }

  async registerCouchDB (username, password) {
    this.loading.auth = true
    const _username = username.trim()
    const _password = password.trim()
    await this.http
      .put(`${this.workspace.db}/_users/org.couchdb.user:${_username}`,
        { name: _username, password: _password, roles: [], type: 'user' }
      )
      .toPromise()
      .then(async () => {
        // await this.login(_username, _password)
        this.authView = 'login'
      })
      .catch((response) => {
        this.toastr.error(response.error.reason, response.error.error)
      })
    this.loading.auth = false
  }

  // async login (username, password) {
  //   this.loading.auth = true

  //   const _username = username.trim()
  //   const _password = password.trim()

  //   await this.http
  //     .get(`${this.workspace.server}/workspaces`, {
  //       headers: { Authorization: 'Basic ' + btoa(_username + ':' + _password) }
  //     })
  //     .toPromise()
  //     .then((response: { workspaces: string[] }) => {
  //       this.workspaces = response.workspaces
  //         .map(p => {
  //           return {
  //             key: p
  //           }
  //         })
  //       this.workspace.username = _username
  //       this.workspace.token = _password
  //       this.wizard.active = 'link'
  //       return this.loadWorkspaces()
  //     })
  //     .catch((response) => {
  //       this.toastr.error(response.error.reason, response.error.error)
  //     })
  //   this.loading.auth = false
  // }

  // async createWorkspace (name) {
  //   this.loading.auth = true
  //   await this.http
  //     .post(`${this.workspace.server}/workspaces`, {
  //       name
  //     }, {
  //       headers: { Authorization: 'Basic ' + btoa(this.workspace.username + ':' + this.workspace.token) }
  //     })
  //     .toPromise()
  //     .then((response: {
  //       key: string,
  //       dbs: string[],
  //       owner: string
  //     }) => {
  //       return this.login(this.workspace.username, this.workspace.token)
  //     })
  //     .catch((response) => {
  //       this.toastr.error(response.error.reason, response.error.error)
  //     })
  //   this.loading.auth = false
  // }

  // async loadWorkspaces () {
  //   const loads = []
  //   this.workspaces.forEach(workspace => {
  //     const n = this.http
  //       .get(`${this.workspace.server}/workspaces/${workspace.key}`, {
  //         headers: { Authorization: 'Basic ' + btoa(this.workspace.username + ':' + this.workspace.token) }
  //       })
  //       .toPromise()
  //       .then((response: RemoteWorkspace) => {
  //         workspace = Object.assign(workspace, response)
  //       })
  //     loads.push(n)
  //   })
  //   await Promise.all(loads)
  //     .catch((response) => {
  //       this.toastr.error(response.error.reason, response.error.error)
  //     })

  //   this.workspaces = this.workspaces.sort((a, b) => b.created - a.created)
  // }

  // async removeWorkspace (workspace: RemoteWorkspace) {
  //   if (!confirm(`Are you sure you want to delete workspace ${workspace.name} and all data? This is not reversible. Please make some backups first.`)) return
  //   await this.http
  //     .delete(`${this.workspace.server}/workspaces/${workspace.key}`, {
  //       headers: { Authorization: 'Basic ' + btoa(this.workspace.username + ':' + this.workspace.token) }
  //     })
  //     .toPromise()
  //     .catch((response) => {
  //       this.toastr.error(response.error.reason, response.error.error)
  //     })
  //   this.loading.auth = false
  //   await this.login(this.remote.username, this.remote.token)
  // }

  // linkRemote (workspace: RemoteWorkspace) {
  //   this.remote.key = workspace.key
  //   this.remote.name = workspace.name
  //   this.remote.owner = workspace.owner
  //   this.remote.members = workspace.members
  // }
}
