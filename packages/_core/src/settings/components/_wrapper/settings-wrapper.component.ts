import { Component, OnInit, ViewChild } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RxCollection } from 'rxdb'
import { Router } from '@angular/router'
import { FilePickerDirective, ReadFile } from 'ngx-file-helpers'

import { ConfigService, Profile } from '@balnc/common'

@Component({
  selector: 'core-settings-wrapper',
  templateUrl: './settings-wrapper.component.html',
  styleUrls: ['./settings-wrapper.component.scss'],
})
export class SettingsWrapperComponent implements OnInit {

  @ViewChild(FilePickerDirective)

  selected: Profile
  profiles: Profile[]
  error: string

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.load()
  }

  load() {
    this.profiles = this.configService.profiles
    this.selected = this.configService.profile
  }

  clear() {
    this.configService.clearAllProfiles()
  }

  createDemo() {
    const alias = this.configService.createProfile()
    this.configService.activateProfile(alias)
  }

  onFilePicked(file: ReadFile) {
    this.error = null
    try {
      const data = file.content.split(',')[1]
      const profileStr = atob(data)
      const profile = JSON.parse(profileStr)
      const alias = this.configService.createProfile(profile)
      this.configService.activateProfile(alias)
    } catch (error) {
      this.error = "File is corrupted"
      console.log("[ProfileComponent]", "Error" + error)
    }
  }
}
