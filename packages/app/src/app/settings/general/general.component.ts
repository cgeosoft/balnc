import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService, RxDBService } from '@balnc/core'
import { Profile } from '@balnc/shared'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
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

  constructor (
    private configService: ConfigService,
    private modal: NgbModal,
    private router: Router,
    private rxdbService: RxDBService
  ) {
  }

  async ngOnInit () {
    this.profile = this.configService.profile
  }

  rename (newName) {
    if (!newName) return
    this.profile.name = newName
    this.configService.save(this.profile)
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

  async editRaw () {
    const m = this.modal.open(RawViewComponent, { backdrop: 'static' })
    m.componentInstance.profile = this.profile
    this.profile = await m.result
  }

  export () {
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
