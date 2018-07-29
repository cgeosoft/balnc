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
    // emtpy
  }

  back () {
    this.stepIndex--
  }

  next () {
    this.stepIndex++
  }

  addDemo () {
    this.profile = this.configService.DEMO_PROFILE
    this.stepIndex = this.steps.length - 1
  }

  // addDemoProfile () {
  //   const newProfile: Profile = Object.assign({}, demoProfile) as Profile
  //   const alias = this.configService.saveProfile(newProfile)

  //   this.configService.selectProfile(alias)
  //   this.router.navigate(['dashboard'])
  // }
}
