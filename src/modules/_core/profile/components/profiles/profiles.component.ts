import { Component, OnInit, ViewChild } from '@angular/core'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RxCollection } from 'rxdb'
import { Router } from '@angular/router'

import { ProfileService } from '@balnc/core/profile/services/profile.service'
import { Profile } from '@balnc/core/profile/data/profile'
import { FilePickerDirective, ReadFile } from 'ngx-file-helpers'
import { DatabaseService } from '@balnc/common/services/database.service';
import { ConfigService } from '@balnc/common/services/config.service';

@Component({
  selector: 'app-profile-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {

  appVersion: any;
  error: string;
  @ViewChild(FilePickerDirective)

  alias: any
  selectedProfile: Profile
  profiles: Profile[]

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private configService: ConfigService,
    private databaseService: DatabaseService,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.selectedProfile = this.profileService.getCurrent()
    this.profiles = this.profileService.config.profiles || []
    this.appVersion = this.configService.version
  }
  clear() {
    this.profileService.clear()
    this.profiles = this.profileService.config.profiles
  }

  quickCreateProfile() {
    const quickLocalName = `Demo ${(new Date).getTime()} Profile`
    this.profileService.add({
      alias: "",
      name: quickLocalName,
      modules: {
        "@balnc/business-invoices": {
          "enabled": true
        },
        "@balnc/marketing-presentations": {
          "enabled": true
        },
        "@balnc/team-projects": {
          "enabled": true
        },
        "@balnc/team-chat": {
          "enabled": true
        }
      },
    })
    this.select(quickLocalName)
  }

  onFilePicked(file: ReadFile) {
    this.error = null
    try {
      const data = file.content.split(',')[1]
      const profileStr = atob(data)
      const profile = JSON.parse(profileStr)
      this.profileService.add(profile)
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
