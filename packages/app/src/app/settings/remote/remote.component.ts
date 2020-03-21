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

  get profile () {
    return this.configService.profile
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
    this.serverConfig = {
      ...this.profile.server,
      ...{
        type: null
      }
    }
    this.dbConfig = {
      ...this.profile.db,
      ...{
        type: null
      }
    }
  }

  async applyServer () {
    this.profile.server = {
      ...this.serverConfig
    }
    this.configService.save(this.profile)
    await this.rxdbService.setup()
  }

  async applyDb () {
    this.profile.db = {
      ...this.dbConfig
    }
    this.configService.save(this.profile)
    await this.rxdbService.setup()
  }

  async registerCouchDB (username, password) {
    this.loading.auth = true
    const _username = username.trim()
    const _password = password.trim()
    await this.http
      .put(`${this.profile.db}/_users/org.couchdb.user:${_username}`,
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
  //     .get(`${this.profile.server}/profiles`, {
  //       headers: { Authorization: 'Basic ' + btoa(_username + ':' + _password) }
  //     })
  //     .toPromise()
  //     .then((response: { profiles: string[] }) => {
  //       this.profiles = response.profiles
  //         .map(p => {
  //           return {
  //             key: p
  //           }
  //         })
  //       this.profile.username = _username
  //       this.profile.token = _password
  //       this.wizard.active = 'link'
  //       return this.loadProfiles()
  //     })
  //     .catch((response) => {
  //       this.toastr.error(response.error.reason, response.error.error)
  //     })
  //   this.loading.auth = false
  // }

  // async createProfile (name) {
  //   this.loading.auth = true
  //   await this.http
  //     .post(`${this.profile.server}/profiles`, {
  //       name
  //     }, {
  //       headers: { Authorization: 'Basic ' + btoa(this.profile.username + ':' + this.profile.token) }
  //     })
  //     .toPromise()
  //     .then((response: {
  //       key: string,
  //       dbs: string[],
  //       owner: string
  //     }) => {
  //       return this.login(this.profile.username, this.profile.token)
  //     })
  //     .catch((response) => {
  //       this.toastr.error(response.error.reason, response.error.error)
  //     })
  //   this.loading.auth = false
  // }

  // async loadProfiles () {
  //   const loads = []
  //   this.profiles.forEach(profile => {
  //     const n = this.http
  //       .get(`${this.profile.server}/profiles/${profile.key}`, {
  //         headers: { Authorization: 'Basic ' + btoa(this.profile.username + ':' + this.profile.token) }
  //       })
  //       .toPromise()
  //       .then((response: RemoteProfile) => {
  //         profile = Object.assign(profile, response)
  //       })
  //     loads.push(n)
  //   })
  //   await Promise.all(loads)
  //     .catch((response) => {
  //       this.toastr.error(response.error.reason, response.error.error)
  //     })

  //   this.profiles = this.profiles.sort((a, b) => b.created - a.created)
  // }

  // async removeProfile (profile: RemoteProfile) {
  //   if (!confirm(`Are you sure you want to delete profile ${profile.name} and all data? This is not reversible. Please make some backups first.`)) return
  //   await this.http
  //     .delete(`${this.profile.server}/profiles/${profile.key}`, {
  //       headers: { Authorization: 'Basic ' + btoa(this.profile.username + ':' + this.profile.token) }
  //     })
  //     .toPromise()
  //     .catch((response) => {
  //       this.toastr.error(response.error.reason, response.error.error)
  //     })
  //   this.loading.auth = false
  //   await this.login(this.remote.username, this.remote.token)
  // }

  // linkRemote (profile: RemoteProfile) {
  //   this.remote.key = profile.key
  //   this.remote.name = profile.name
  //   this.remote.owner = profile.owner
  //   this.remote.members = profile.members
  // }
}
