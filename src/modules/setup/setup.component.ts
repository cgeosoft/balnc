import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService, HelperService, BModule, Profile, DEMO_PROFILE } from '@balnc/common'
import { ReadFile } from 'ngx-file-helpers'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'core-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  steps = [
    { label: 'Setup' },
    { label: 'Profile' },
    { label: 'Sync' },
    { label: 'Modules' },
    { label: 'Finish' }
  ]
  stepIndex = 0

  accepted: false

  profile: Profile = {
    bmodules: {}
  }

  bmodules: BModule[]

  constructor (
    public helperService: HelperService,
    public configService: ConfigService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit () {
    if (this.configService.profiles.length) {
      this.router.navigate(['/dashboard'])
    }

    this.bmodules = this.configService.bmodules
  }

  back () {
    this.stepIndex--
  }

  next () {
    this.stepIndex++
  }

  async finish () {
    this.profile.name = this.profile.name || this.helperService.generateName()
    const alias = await this.configService.saveBModule(this.profile)
    await this.configService.selectProfile(alias)
  }

  addDemo () {
    this.profile = DEMO_PROFILE
    this.stepIndex = this.steps.length - 1
  }

  importFile (file: ReadFile) {
    const profile: Profile = this.configService.importFile(file)
    if (!profile) {
      this.toastr.error('Import failed')
      return
    }
    this.stepIndex = this.steps.length - 1
  }
}
