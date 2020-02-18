import { HttpClient } from '@angular/common/http'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ConfigService, Signal, SignalService } from '@balnc/core'
import { Profile } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { BoardsDemoService } from '../../boards/@shared/services/demo.service'
import { BusinessDemoService } from '../../business/@shared/services/demo.service'
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
    private businessDemoService: BusinessDemoService,
    private boardsDemoService: BoardsDemoService
  ) {
    this.signalLogs$ = this.signalService.logs$
  }

  async ngOnInit () {
    this.profile = this.configService.profile
    if (this.profile.remote.key) {
      await this.getRemote()
    }

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

  delete () {
    if (!confirm('Are you sure?')) return
    this.configService.remove(this.profile.key)
    window.location.reload()
  }

  toggleRemote () {
    if (!confirm('Are you sure?')) return
    this.profile.remote.enabled = !this.profile.remote.enabled
    this.configService.save(this.profile)
    window.location.reload()
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
    this.profile.remote = remote
    this.configService.save(this.profile)
    window.location.reload()
  }

  async getRemote () {
    const manifest = await this.http
      .get<{ members: string[] }>(`${this.profile.remote.server}/profiles/${this.profile.remote.key}`, {
        headers: { Authorization: 'Basic ' + btoa(this.profile.remote.username + ':' + this.profile.remote.token) }
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
        headers: { Authorization: 'Basic ' + btoa(this.profile.remote.username + ':' + this.profile.remote.token) }
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
        headers: { Authorization: 'Basic ' + btoa(this.profile.remote.username + ':' + this.profile.remote.token) }
      }).toPromise()
    await this.getRemote()
  }

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
