import { Router, ActivatedRoute } from '@angular/router'
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'

import { BalncModule, DatabaseService, ConfigService, Profile } from '@balnc/common'

@Component({
  selector: 'core-settings-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('name') name: ElementRef
  @ViewChild('alias') alias: ElementRef

  profileName: string
  profileAlias: string

  modules: BalncModule[]
  activeModules: { [key: string]: boolean } = {}
  profile: Profile
  profileEdit: Profile
  form: FormGroup
  deleteData = false
  deleteDataRemote = false

  constructor (
        private router: Router,
        private route: ActivatedRoute,
        private configService: ConfigService,
        private databaseService: DatabaseService
    ) { }

  async ngOnInit () {
    this.modules = this.configService.packages

    this.route.params.subscribe(params => {
      this.setup(params['alias'])
    })
  }

  setup (alias: string = null) {
    this.profile = this.configService.getProfile(alias)

    if (!this.profile) {
      this.router.navigate(['/settings'])
    }

    this.profileName = this.profile.name
    this.profileAlias = this.profile.alias
    this.profileEdit = { ...this.profile }
    this.profileEdit.remote = this.profileEdit.remote || {}
    this.profileEdit.modules = this.profileEdit.modules || {}

    if (this.profile.modules) {
      this.activeModules = Object.keys(this.profileEdit.modules).reduce((x, i) => {
        x[i] = this.profile.modules[i].enabled
        return x
      }, {})
    }
  }

  save () {
    this.configService.saveProfile(this.profileEdit)
  }

  async backup () {
    const data = await this.databaseService.backup()

    const a = document.createElement('a')
    const file = new Blob([JSON.stringify(data)], { type: 'application/json' })
    a.href = URL.createObjectURL(file)
    a.download = `data-${(new Date).getTime()}.json`
    a.click()
  }

  restore () { }

  delete () {
        // this.configService.deleteProfile(this.profileEdit.alias)
    this.router.navigate(['/profiles'])
  }

  activate () {
    this.configService.selectProfile(this.profile.alias)
  }

}
