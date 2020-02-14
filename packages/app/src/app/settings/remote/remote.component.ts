import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { Profile } from '@balnc/shared'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr'
import { environment } from '../../../environments/environment'

interface RemoteStatus {
  started: Date
  db: string
}

interface RemoteProfile {
  key: string
  name?: string
  created?: number
  owner?: string
  members?: string[]
}

@Component({
  selector: 'app-settings-remote',
  templateUrl: './remote.component.html'
})
export class RemoteComponent implements OnInit {

  profile: Profile
  profiles: RemoteProfile[] = []

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
  remote: any

  constructor (
    private http: HttpClient,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private config: ConfigService
  ) { }

  get localProfile () {
    return this.config.profile
  }

  get remoteProfile () {
    if (!this.remote.key) return {}
    return this.profiles.find(p => p.key === this.remote.key)
  }

  get isDemo () {
    const demoServer = environment.servers.find(s => s.label === 'Demo Server')
    return demoServer.url === this.remote.server
  }

  ngOnInit () {
    this.remote = {
      ...this.config.profile.remote,
      ...{
        enabled: false,
        server: null,
        username: null,
        token: null
      }
    }
  }

  save () {
    this.activeModal.close(this.remote)
  }

  dismiss () {
    this.activeModal.dismiss()
  }

  async verify (server) {
    this.loading.verifing = true
    const _server = server.trim().replace(/\/$/, '')
    await this.http
      .get(`${_server}/status`)
      .toPromise()
      .then((result: RemoteStatus) => {
        this.remote.db = result.db
        this.wizard.active = 'auth'
      })
      .catch((err) => {
        this.toastr.error(err.message)
      })
    this.loading.verifing = false
  }

  async register (username, password) {
    this.loading.auth = true
    const _username = username.trim()
    const _password = password.trim()
    await this.http
      .put(`${this.remote.db}/_users/org.couchdb.user:${_username}`,
        { name: _username, password: _password, roles: [], type: 'user' }
      )
      .toPromise()
      .then(async () => {
        await this.login(_username, _password)
        this.authView = 'login'
      })
      .catch((response) => {
        this.toastr.error(response.error.reason, response.error.error)
      })
    this.loading.auth = false
  }

  async login (username, password) {
    this.loading.auth = true

    const _username = username.trim()
    const _password = password.trim()

    await this.http
      .get(`${this.remote.server}/profiles`, {
        headers: { Authorization: 'Basic ' + btoa(_username + ':' + _password) }
      })
      .toPromise()
      .then((response: { profiles: string[] }) => {
        this.profiles = response.profiles
          .map(p => {
            return {
              key: p
            }
          })
        this.remote.username = _username
        this.remote.token = _password
        this.wizard.active = 'link'
        return this.loadProfiles()
      })
      .catch((response) => {
        this.toastr.error(response.error.reason, response.error.error)
      })
    this.loading.auth = false
  }

  async createProfile (name) {
    this.loading.auth = true
    await this.http
      .post(`${this.remote.server}/profiles`, {
        name
      }, {
        headers: { Authorization: 'Basic ' + btoa(this.remote.username + ':' + this.remote.token) }
      })
      .toPromise()
      .then((response: {
        key: string,
        dbs: string[],
        owner: string
      }) => {
        return this.login(this.remote.username, this.remote.token)
      })
      .catch((response) => {
        this.toastr.error(response.error.reason, response.error.error)
      })
    this.loading.auth = false
  }

  async loadProfiles () {
    const loads = []
    this.profiles.forEach(profile => {
      const n = this.http
        .get(`${this.remote.server}/profiles/${profile.key}`, {
          headers: { Authorization: 'Basic ' + btoa(this.remote.username + ':' + this.remote.token) }
        })
        .toPromise()
        .then((response: RemoteProfile) => {
          profile = Object.assign(profile, response)
        })
      loads.push(n)
    })
    await Promise.all(loads)
      .catch((response) => {
        this.toastr.error(response.error.reason, response.error.error)
      })

    this.profiles = this.profiles.sort((a, b) => b.created - a.created)
  }

  async removeProfile (profile: RemoteProfile) {
    if (!confirm(`Are you sure you want to delete profile ${profile.name} and all data? This is not reversible. Please make some backups first.`)) return
    await this.http
      .delete(`${this.remote.server}/profiles/${profile.key}`, {
        headers: { Authorization: 'Basic ' + btoa(this.remote.username + ':' + this.remote.token) }
      })
      .toPromise()
      .catch((response) => {
        this.toastr.error(response.error.reason, response.error.error)
      })
    this.loading.auth = false
    await this.login(this.remote.username, this.remote.token)
  }

  linkRemote (profile: RemoteProfile) {
    this.remote.key = profile.key
    this.remote.name = profile.name
    this.remote.owner = profile.owner
    this.remote.members = profile.members
  }

  async finish () {
    this.activeModal.close(this.remote)
  }
}
