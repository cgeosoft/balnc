import { Component, OnInit, ViewChild } from '@angular/core'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RxCollection } from 'rxdb'
import { Router } from '@angular/router'

import { CreateProfileComponent } from '@blnc/core/profile/components/create/create.component'
import { ProfileService } from '@blnc/core/profile/services/profile.service'
import { Profile } from '@blnc/core/profile/data/profile'
import { FilePickerDirective, ReadFile } from 'ngx-file-helpers'
import { DatabaseService } from '@blnc/core/common/services/database.service';

@Component({
  selector: 'app-profile-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {

  @ViewChild(FilePickerDirective)

  alias: any
  selected: Profile
  profiles: Profile[] = []

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private databaseService: DatabaseService,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.selected = this.profileService.get()
    this.profiles = this.profileService.config.profiles
  }

  create() {
    this.modalService
      .open(CreateProfileComponent)
      .result
      .then((result) => {
        this.profiles = this.profileService.config.profiles
      })
  }

  createProfile() {
    const quickLocalAlias = `#${(new Date()).getTime()}`
    const quickLocalName = `Local Profile ${quickLocalAlias}`
    this.profileService.add({
      name: quickLocalName,
    })
    this.selectProfile(quickLocalName)
  }

  onFilePicked(file: ReadFile) {
    try {
      console.log(file.content)
      const profileStr = atob(file.content.replace("data:;base64,", ""))
      const profile = JSON.parse(profileStr)
      this.profileService.add(profile)
      this.selectProfile(profile.name)
    } catch (error) {
      console.log("error" + error)
    }
  }

  selectProfile(name: string) {
    this.profileService.select(name)
    this.selected = this.profileService.get()
    this.databaseService.setup(this.selected)
    this.router.navigate(['dashboard'])
  }
}
