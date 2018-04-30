import { Component, OnInit, ViewChild } from '@angular/core'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RxCollection } from 'rxdb'
import { Router } from '@angular/router'

import { CreateProfileComponent } from '@blnc/core/profile/components/create/create.component'
import { ProfileService } from '@blnc/core/profile/services/profile.service'
import { Profile } from '@blnc/core/profile/data/profile'
import { FilePickerDirective, ReadFile } from 'ngx-file-helpers'
import { DatabaseService } from '@blnc/core/common/services/database.service';
import { ConfigService } from '@blnc/core/common/services/config.service';

@Component({
  selector: 'app-profile-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {

  error: string;
  @ViewChild(FilePickerDirective)

  alias: any
  selected: Profile
  profiles: Profile[] = []

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private configService: ConfigService,
    private databaseService: DatabaseService,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.selected = this.profileService.get()
    this.profiles = this.profileService.config.profiles || []
  }

  create() {
    this.modalService
      .open(CreateProfileComponent)
      .result
      .then((result) => {
        this.profiles = this.profileService.config.profiles
      })
  }

  clear() {
    this.profileService.clear()
    this.profiles = this.profileService.config.profiles
  }

  quickCreateProfile() {
    const quickLocalName = `Demo ${(new Date).getTime()} Profile`
    this.profileService.add({
      name: quickLocalName,
      modules: {
        "@blnc/business-invoices": {
          "enabled": true
        },
        "@blnc/marketing-presentations": {
          "enabled": true
        },
        "@blnc/teams-projects": {
          "enabled": true
        },
        "@blnc/teams-chat": {
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
      this.select(profile.name)
    } catch (error) {
      this.error = "File is corrupted"
      console.log("error" + error)
    }
  }

  select(name: string) {
    this.profileService.select(name)
    this.selected = this.profileService.get()
    this.databaseService.setup(this.selected)
    this.configService.profile = this.selected
    this.router.navigate(['dashboard'])
  }

  configure(name: string) {

  }

}
