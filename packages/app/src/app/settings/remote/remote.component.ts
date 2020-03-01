import { HttpClient } from '@angular/common/http'
import { Component, HostBinding, OnInit } from '@angular/core'
import { ConfigService, RxDBService } from '@balnc/core'
import { ToastrService } from 'ngx-toastr'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-settings-remote',
  templateUrl: './remote.component.html'
})
export class RemoteComponent implements OnInit {
  @HostBinding('class') errorClass

  // profiles: RemoteProfile[] = []
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

  remote: any = {}

  get profile () {
    return this.configService.profile
  }

  get isDemo () {
    if (!this.remote?.host) return false
    const demoServer = environment.servers.find(s => s.label === 'Demo Server')
    return demoServer.url === this.remote?.host
  }

  constructor (
    private http: HttpClient,
    private toastr: ToastrService,
    private configService: ConfigService,
    private rxdbService: RxDBService
  ) { }

  ngOnInit () {
    this.remote = { ...this.profile.db?.remote || {} }
  }

  async apply () {
    this.configService.profile.db.remote = { ...this.remote }
    this.configService.save(this.profile)
    this.remote = { ...this.profile.db?.remote || {} }
    await this.rxdbService.setup()
  }

  async toggleStatus () {
    if (!confirm('Are you sure?')) return
    this.configService.profile.db.remote.enabled = !this.remote.enabled
    this.configService.save(this.profile)
    this.remote = { ...this.profile.db?.remote || {} }
    await this.rxdbService.setup()
  }

  async setupRemote () {
    // const m = this.modal.open(RemoteComponent, { backdrop: 'static' })
    // m.componentInstance.profile = this.profile
    // const remote = await m.result
    // this.profile.db = remote
    // this.configService.save(this.profile)
    // await this.router.navigateByUrl('/')
  }
  // async verify (server) {
  //   this.loading.verifing = true
  //   const _server = server.trim().replace(/\/$/, '')
  //   await this.http
  //     .get(`${_server}/status`)
  //     .toPromise()
  //     .then((result: RemoteStatus) => {
  //       this.profile.db.host = result.db
  //       this.wizard.active = 'auth'
  //     })
  //     .catch((err) => {
  //       this.toastr.error(err.message)
  //     })
  //   this.loading.verifing = false
  // }

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
