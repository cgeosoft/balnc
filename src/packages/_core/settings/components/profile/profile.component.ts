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

  profile: Profile = {
    packages: {}
  }

  deleteData = false
  deleteDataRemote = false
  selected: string
  needReload = false

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private configService: ConfigService,
    private databaseService: DatabaseService
  ) { }

  async ngOnInit () {
    this.packages = this.configService.packages.map(m => {
      const v = { ...m }
      v.icon = HelperService.getIcon(m.icon)
      return v
    })

    this.packages.forEach(p => {
      if (!this.profile.packages[p.id]) {
        this.profile.packages[p.id] = {
          enabled: false
        }
      }
    })

    this.selected = this.configService.selected

    this.route.params.subscribe(params => {
      this.setup(params['alias'])
    })
  }

  setup (alias: string) {
    console.log(alias)
    this.needReload = false
    let _profile = this.configService.getProfile(alias)

    if (!this.profile) {
      this.router.navigate(['/settings'])
    }

    this.profileName = this.profile.name
    this.profileAlias = this.profile.alias

    this.packages.forEach(p => {
      if (!this.profile.packages[p.id]) {
        this.profile.packages[p.id] = {
          enabled: false
        }
      }
    })
    this.profile = _profile
    console.log(this.profile)
  }

  // save () {
  //   this.configService.saveProfile(this.profileEdit)
  //   if (this.selected === this.profileEdit.alias) {
  //     this.needReload = true
  //   }
  // }

  reload () {
    window.location.reload()
  }

  async backup () {
    const data = await this.databaseService.backup()

    const a = document.createElement('a')
    const file = new Blob([JSON.stringify(data)], { type: 'application/json' })
    a.href = URL.createObjectURL(file)
    a.download = `data-${(new Date()).getTime()}.json`
    a.click()
  }

  restore () {

  }

  delete () {
    // this.configService.deleteProfile(this.profileEdit.alias)
    this.router.navigate(['/profiles'])
  }

  activate () {
    this.configService.selectProfile(this.profile.alias)
  }
}
