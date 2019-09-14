import { HttpClient } from '@angular/common/http'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { Profile } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RemoteComponent } from '../remote/remote.component'

@Component({
  selector: 'app-settings-general',
  templateUrl: './general.component.html'
})
export class GeneralComponent implements OnInit {

  @ViewChild('name', { static: false }) name: ElementRef
  @ViewChild('alias', { static: false }) alias: ElementRef

  profileName: string
  profileAlias: string

  selected: string
  profile: Profile

  deleteData = false
  deleteDataRemote = false
  editName = false

  constructor (
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private modal: NgbModal
  ) { }

  ngOnInit () {
    this.profile = this.configService.profile
    if (this.profile.remote.key) {
      this.getRemote()
    }
  }

  rename (newName) {
    if (!newName) return
    this.profile.name = newName
    this.configService.saveProfile(this.profile)
  }

  activate () {
    this.configService.selectProfile(this.profile.key)
  }

  delete () {
    if (!confirm('Are you sure?')) return
    this.configService.deleteProfile(this.profile.key)
    window.location.reload()
  }

  toggleRemote () {
    if (!confirm('Are you sure?')) return
    this.profile.remote.enabled = !this.profile.remote.enabled
    this.configService.saveProfile(this.profile)
    window.location.reload()
  }

  async setupRemote () {
    const m = this.modal.open(RemoteComponent, { backdrop: 'static' })
    m.componentInstance.profile = this.profile
    const remote = await m.result
    this.profile.remote = remote
    this.configService.saveProfile(this.profile)
    window.location.reload()
  }

  async getRemote () {
    const manifest = await this.http
      .get<{ members: string[] }>(`${this.profile.remote.server}/profiles/${this.profile.remote.key}`, {
        headers: { Authorization: 'Basic ' + btoa(this.profile.remote.username + ':' + this.profile.remote.password) }
      }).toPromise()
    this.profile.remote.members = manifest.members
  }

  async addMember (username) {
    if (!username) return
    if (!confirm('Are you sure?')) return
    this.profile.remote.members.push(username)
    this.profile.remote.members = this.profile.remote.members.filter((v, i) => this.profile.remote.members.indexOf(v) === i)
    await this.http
      .put(`${this.profile.remote.server}/profiles/${this.profile.remote.key}`, {
        name: this.profile.remote.name,
        members: this.profile.remote.members
      }, {
          headers: { Authorization: 'Basic ' + btoa(this.profile.remote.username + ':' + this.profile.remote.password) }
        }).toPromise()
    await this.getRemote()
  }

  async removeMember (username) {
    if (!username) return
    if (!confirm('Are you sure?')) return
    this.profile.remote.members = this.profile.remote.members.filter((v, i) => v !== username)
    await this.http
      .put(`${this.profile.remote.server}/profiles/${this.profile.remote.key}`, {
        name: this.profile.remote.name,
        members: this.profile.remote.members
      }, {
          headers: { Authorization: 'Basic ' + btoa(this.profile.remote.username + ':' + this.profile.remote.password) }
        }).toPromise()
    await this.getRemote()
  }
}
