import { Router, ActivatedRoute } from '@angular/router'
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'

import { Package, DatabaseService, ConfigService, Profile, HelperService } from '@balnc/common'

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

  packages: Package[]

  selected: string
  profile: Profile

  deleteData = false
  deleteDataRemote = false
  needReload = false

  // tabMenu = {
  //   tabs: [{
  //     id: 'Profile',
  //     label: 'Profile',
  //     icon: 'cog'
  //   }, {
  //     id: 'Profile',
  //     label: 'Profile',
  //     icon: 'cog',
  //     right: true
  //   }, {
  //     id: 'doc',
  //     label: 'Doc',
  //     icon: 'code',
  //     right: true
  //   }]
  // }

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private configService: ConfigService,
    private databaseService: DatabaseService
  ) { }

  async ngOnInit () {

    this.selected = this.configService.selected
    this.packages = this.configService.packages

    this.route.params.subscribe(params => {
      this.setup(params['alias'])
    })
  }

  setup (alias: string) {
    this.needReload = false
    let _profile = this.configService.getProfile(alias)
    if (!_profile) {
      this.router.navigate(['/settings'])
    }
    this.profileName = _profile.name
    this.profileAlias = _profile.alias
    this.profile = _profile
  }

  save () {
    this.configService.saveProfile(this.profile)
    this.needReload = true
  }

  reload () {
    window.location.reload()
  }

  async export () {

    const data = await this.databaseService.export()
    const backup = {
      profile: this.profile,
      data: data
    }
    const a = document.createElement('a')
    const file = new Blob([JSON.stringify(backup)], { type: 'application/json' })
    a.href = URL.createObjectURL(file)
    a.download = `balnc.${this.profile.alias}.${(new Date()).getTime()}.json`
    a.click()
  }

  delete () {
    this.configService.deleteProfile(this.profile.alias)
    this.router.navigate(['/settings'])
  }

  activate () {
    this.configService.selectProfile(this.profile.alias)
  }
}
