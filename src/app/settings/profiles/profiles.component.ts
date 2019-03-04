import { Component } from '@angular/core';
import { ConfigService } from '@balnc/core';
import { Helpers } from '@balnc/shared';
import { ReadFile } from 'ngx-file-helpers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'settings-profiles',
  templateUrl: './profiles.component.html'
})
export class ProfilesComponent {

  constructor (
    private configService: ConfigService,
    private toastr: ToastrService
  ) { }

  get profiles () {
    return this.configService.profiles
  }
  get selected () {
    return this.configService.selected
  }

  activate (profileId) {
    this.configService.selectProfile(profileId)
  }

  create () {
    const alias = this.configService.saveProfile({
      name: Helpers.generateName()
    })
    this.configService.selectProfile(alias)
  }

  remove (profileId) {
    this.configService.removeProfile(profileId)
  }

  async import (file: ReadFile) {
    const profile = this.configService.importFile(file)
    if (!profile) {
      this.toastr.error('Import failed')
      return
    }
    const alias = this.configService.saveProfile(profile)
    this.configService.selectProfile(alias)
  }
}
