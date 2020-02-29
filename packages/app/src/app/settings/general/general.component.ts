import { HttpClient } from '@angular/common/http'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService, RxDBService, Signal, SignalService } from '@balnc/core'
import { Profile } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RemoteComponent } from '../remote/remote.component'
import { RawViewComponent } from './../raw-view/raw-view.component'

@Component({
  selector: 'app-settings-general',
  templateUrl: './general.component.html'

})
export class GeneralComponent implements OnInit {

  @ViewChild('name') name: ElementRef
  @ViewChild('alias') alias: ElementRef

  profileName: string
  profileAlias: string

  selected: string
  profile: Profile

  deleteData = false
  deleteDataRemote = false
  editName = false
  signalLogs$
  demoWorking = false

  constructor (
    private http: HttpClient,
    private configService: ConfigService,
    private modal: NgbModal,
    private signalService: SignalService,
    private router: Router,
    private rxdbService: RxDBService
  ) {
    this.signalLogs$ = this.signalService.logs$
  }

  async ngOnInit () {
    this.profile = this.configService.profile
    this.signalService
      .events(Signal.DEMO_COMPLETED)
      .subscribe(() => {
        this.demoWorking = false
      })
  }

  async generateDemoData () {
    if (!confirm('Are you sure?')) return
    this.demoWorking = true
    this.signalService.broadcast(Signal.DEMO_GENERATE)
  }

  async clearDemoData () {
    if (!confirm('Are you sure?')) return
    this.demoWorking = true
    this.signalService.broadcast(Signal.DEMO_CLEAR)
  }

  rename (newName) {
    if (!newName) return
    this.profile.name = newName
    this.configService.save(this.profile)
  }

  activate () {
    this.configService.select(this.profile.key)
  }

  async delete () {
    if (!confirm('Are you sure?')) return
    await this.rxdbService.remove(this.profile.key)
    this.configService.remove(this.profile.key)
    this.configService.selected = null

    if (!this.configService.profiles.length) {
      await this.router.navigate(['/setup'])
      return false
    }
    this.configService.setup()
    await this.rxdbService.setup()
  }

  async toggleRemote () {
    if (!confirm('Are you sure?')) return
    this.profile.db.remote = !this.profile.db.remote
    this.configService.save(this.profile)
    await this.router.navigateByUrl('/')
  }

  async editRaw () {
    const m = this.modal.open(RawViewComponent, { backdrop: 'static' })
    m.componentInstance.profile = this.profile
    this.profile = await m.result
  }

  async setupRemote () {
    const m = this.modal.open(RemoteComponent, { backdrop: 'static' })
    m.componentInstance.profile = this.profile
    const remote = await m.result
    this.profile.db = remote
    this.configService.save(this.profile)
    await this.router.navigateByUrl('/')
  }

  // async getRemote () {
  //   const manifest = await this.http
  //     .get<{ members: string[] }>(`${this.profile.data.server}/profiles/${this.profile.data.key}`, {
  //       headers: { Authorization: 'Basic ' + btoa(this.profile.data.username + ':' + this.profile.data.token) }
  //     }).toPromise()
  //   this.profile.data.members = manifest.members
  // }

  // async addMember (username) {
  //   if (!username) return
  //   if (!confirm('Are you sure?')) return
  //   this.profile.data.members.push(username)
  //   this.profile.data.members = this.profile.data.members.filter((v, i) => this.profile.data.members.indexOf(v) === i)
  //   await this.http
  //     .put(`${this.profile.data.server}/profiles/${this.profile.data.key}`, {
  //       name: this.profile.data.name,
  //       members: this.profile.data.members
  //     }, {
  //       headers: { Authorization: 'Basic ' + btoa(this.profile.data.username + ':' + this.profile.data.token) }
  //     }).toPromise()
  //   await this.getRemote()
  // }

  // async removeMember (username) {
  //   if (!username) return
  //   if (!confirm('Are you sure?')) return
  //   this.profile.data.members = this.profile.data.members.filter((v, i) => v !== username)
  //   await this.http
  //     .put(`${this.profile.data.server}/profiles/${this.profile.data.key}`, {
  //       name: this.profile.data.name,
  //       members: this.profile.data.members
  //     }, {
  //       headers: { Authorization: 'Basic ' + btoa(this.profile.data.username + ':' + this.profile.data.token) }
  //     }).toPromise()
  //   await this.getRemote()
  // }

  exportProfile () {
    let a = document.createElement('a')
    let file = new Blob([JSON.stringify(this.profile, null, 2)], { type: 'application/json' })
    a.href = URL.createObjectURL(file)
    a.download = `${(new Date()).toDateString()} - ${this.profile.name}.json`
    a.click()
  }

  save () {
    this.configService.save(this.profile)
  }
}
