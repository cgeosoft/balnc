import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService, DEMO_PROFILE, HelperService, Plugin, Profile } from '@balnc/core';
import { FilePickerDirective, ReadFile } from 'ngx-file-helpers';

@Component({
  selector: 'settings-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {

  @ViewChild(FilePickerDirective)

  error: string
  profile: Profile
  plugins: Plugin[] = []

  helperService = HelperService

  constructor (
    public configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit () {
    this.profile = this.configService.getProfile()
    this.plugins = this.configService.plugins
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
      plugins: {}
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
