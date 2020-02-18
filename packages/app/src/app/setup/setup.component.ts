import { Component } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { DEMO_PROFILE } from '@balnc/shared'
import { ReadFile } from 'ngx-file-helpers'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent {
  analytics = false

  get version () {
    return this.configService.version
  }

  get build () {
    return this.configService.build
  }

  constructor (
    public configService: ConfigService,
    private toastr: ToastrService
  ) { }

  start () {
    const profile = { ...DEMO_PROFILE }
    profile.analytics = this.analytics
    this.load(profile)
  }

  import (file: ReadFile) {
    const profile = this.configService.import(file)
    if (!profile) {
      this.toastr.error('Import failed')
      return
    }
    profile.analytics = this.analytics
    this.load(profile)
  }

  load (profile) {
    const alias = this.configService.save(profile)
    this.configService.select(alias)
  }
}
