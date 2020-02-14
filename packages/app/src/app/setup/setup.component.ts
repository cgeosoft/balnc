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

  constructor (
    public configService: ConfigService,
    private toastr: ToastrService
  ) { }

  start () {
    const profile = { ...DEMO_PROFILE }
    this.load(profile)
  }

  import (file: ReadFile) {
    const profile = this.configService.import(file)
    if (!profile) {
      this.toastr.error('Import failed')
      return
    }
    this.load(profile)
  }

  load (profile) {
    const alias = this.configService.save(profile)
    this.configService.select(alias)
  }
}
