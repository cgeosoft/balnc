import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { ConfigService, Profile } from '@balnc/common'

@Component({
  selector: 'core-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  steps = [
    { label: 'Intro', hideBreadcrump: true },
    { label: 'Profile' },
    { label: 'Remote' },
    { label: 'Modules' },
    { label: 'Finish' }
  ]
  stepIndex = 1
  accepted: boolean

  profile: Profile = {}

  constructor (
    public configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit () {
    if (this.configService.selected) {
      this.router.navigate(['/dashboard'])
    }
  }

  back () {
    this.stepIndex--
  }

  next () {
    this.stepIndex++
  }

  async finish () {
    const alias = await this.configService.saveProfile(this.profile)
    await this.configService.selectProfile(alias)
  }

  addDemo () {
    this.profile = this.configService.DEMO_PROFILE
    this.stepIndex = this.steps.length - 1
  }
}
