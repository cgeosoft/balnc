import { Component, OnInit } from '@angular/core'

import { ConfigService, Profile, HelperService } from '@balnc/common'
import { ToastrService } from 'ngx-toastr'
import { ReadFile } from 'ngx-file-helpers'

@Component({
  selector: 'core-settings-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  constructor (
    private configService: ConfigService,
    private toastr: ToastrService
  ) { }

  async ngOnInit () {
    // empty
  }

  activate (alias) {
    this.configService.selectProfile(alias)
  }

  async create () {
    const alias = await this.configService.saveProfile({
      name: HelperService.generateName()
    })
    this.configService.selectProfile(alias)
  }

  async import (file: ReadFile) {
    const profile: Profile = this.configService.importFile(file)
    if (!profile) {
      this.toastr.error('Import failed')
      return
    }
    const alias = await this.configService.saveProfile(profile)
    this.configService.selectProfile(alias)
  }
}
