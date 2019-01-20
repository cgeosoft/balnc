import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService, DEMO_PROFILE, BModule, Profile, HelperService } from '@balnc/common'
import { FilePickerDirective, ReadFile } from 'ngx-file-helpers'

@Component({
  selector: 'core-settings-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  @ViewChild(FilePickerDirective)

  error: string
  profile: Profile
  bmodules: BModule[] = []

  helperService = HelperService

  constructor (
    public configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit () {
    this.profile = this.configService.getProfile()
    this.bmodules = this.configService.bmodules
  }

  clear () {
    this.configService.clearAllProfiles()
  }

  create () {
    // empty
  }

  createProfile () {
    this.configService.saveProfile({
      name: this.helperService.generateName(),
      bmodules: {}
    })
  }

  createDemo () {
    this.configService.saveProfile(DEMO_PROFILE)
  }

  onFilePicked (file: ReadFile) {
    this.error = null
    try {
      const data = file.content.split(',')[1]
      const profileStr = atob(data)
      const profile = JSON.parse(profileStr)
      const alias = this.configService.saveProfile(profile)
      this.configService.selectProfile(alias)
    } catch (error) {
      this.error = 'File is corrupted'
      console.log('[ProfileComponent]', 'Error' + error)
    }
  }
}
