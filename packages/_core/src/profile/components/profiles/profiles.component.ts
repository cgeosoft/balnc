import { Component, OnInit, ViewChild } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RxCollection } from 'rxdb'
import { Router } from '@angular/router'
import { FilePickerDirective, ReadFile } from 'ngx-file-helpers'

import { DatabaseService, ConfigService } from '@balnc/common'

import { ProfileService } from '../../services/profile.service'
import { Profile } from '../../data/profile'

const demoProfile = {
  "name": "Demo Company",
  "key": "demo",
  "remote": {
    "prefix": "demo",
    "host": "https://s2.cgeosoft.com"
  },
  "modules": {
    "@balnc/business": {
      "enabled": true,
      "menu": {
        "invoices": true
      }
    },
    "@balnc/marketing": {
      "enabled": true,
      "menu": {
        "presentations": true
      }
    },
    "@balnc/teams": {
      "enabled": true,
      "menu": {
        "projects": true,
        "boards": true
      }
    }
  },
  "params": null
}

@Component({
  selector: 'core-profile-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {

  @ViewChild(FilePickerDirective)

  alias: any
  selectedProfile: Profile & any
  profiles: Profile[]
  error: string

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private databaseService: DatabaseService,
    private profileService: ProfileService,
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.profiles = this.profileService.profiles || []
    this.selectedProfile = this.profileService.getCurrent() || {}
  }

  clear() {
    this.profileService.clear()
    this.profiles = this.profileService.profiles
  }

  createDemoProfile() {
    const newProfile: Profile = <Profile>Object.assign({}, demoProfile)
    const alias = this.profileService.save(newProfile)
    this.select(alias)
  }

  onFilePicked(file: ReadFile) {
    this.error = null
    try {
      const data = file.content.split(',')[1]
      const profileStr = atob(data)
      const profile = JSON.parse(profileStr)
      this.profileService.save(profile)
      this.select(profile.alias)
    } catch (error) {
      this.error = "File is corrupted"
      console.log("[ProfileComponent]", "Error" + error)
    }
  }

  select(alias: string) {
    this.profileService.select(alias)
    this.selectedProfile = this.profileService.getCurrent()
    this.databaseService.setup(this.selectedProfile)
    this.configService.profile = this.selectedProfile
    this.router.navigate(['dashboard'])
  }
}
