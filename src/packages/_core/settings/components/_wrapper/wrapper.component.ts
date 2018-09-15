import { HelperService } from '../../../../_common/services/helper.service'
import { Component, OnInit, ViewChild } from '@angular/core'
import { FilePickerDirective, ReadFile } from 'ngx-file-helpers'
import { Router } from '@angular/router'

import { ConfigService, Profile } from '@balnc/common'

@Component({
  selector: 'core-settings-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  @ViewChild(FilePickerDirective)

  error: string

  constructor (
    public configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit () {
    // empty
  }

  clear () {
    this.configService.clearAllProfiles()
  }

  create () {
    // empty
  }

  createProfile () {
    const alias = this.configService.saveProfile({
      name: HelperService.generateName(),
      packages: {}
    })
    this.router.navigate(['/settings', alias])
  }

  createDemo () {
    const alias = this.configService.saveProfile(this.configService.DEMO_PROFILE)

    this.router.navigate(['/settings', alias])
  }

  onFilePicked (file: ReadFile) {
    this.error = null
    try {
      const data = file.content.split(',')[1]
      const profileStr = atob(data)
      const profile = JSON.parse(profileStr)
      const alias = this.configService.saveProfile(profile)
      // this.configService.selectProfile(alias)
    } catch (error) {
      this.error = 'File is corrupted'
      console.log('[ProfileComponent]', 'Error' + error)
    }
  }

}
