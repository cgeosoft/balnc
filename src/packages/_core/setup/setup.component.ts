import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { ConfigService, Profile } from '@balnc/common'

@Component({
  selector: 'core-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit, OnDestroy {

  accepted: boolean

  constructor (
    private configService: ConfigService,
    private router: Router
  ) { }

  Ok () {
    localStorage.setItem('welcomeShown', 'OK')
    this.router.navigate(['profiles'])
  }

  ngOnInit () {
  }

  ngOnDestroy () {
  }

  addDemoProfile () {

    const demoProfile = {
      'name': 'Demo Company',
      'key': 'demo',
      'remote': {
        'prefix': 'demo',
        'host': 'https://s2.cgeosoft.com'
      },
      'modules': {
        '@balnc/business': {
          'enabled': true,
          'menu': {
            'invoices': true
          }
        },
        '@balnc/marketing': {
          'enabled': true,
          'menu': {
            'presentations': true
          }
        },
        '@balnc/teams': {
          'enabled': true,
          'menu': {
            'projects': true,
            'boards': true
          }
        }
      },
      'params': null
    }

    const newProfile: Profile = Object.assign({}, demoProfile) as Profile
    const alias = this.configService.saveProfile(newProfile)

    this.configService.selectProfile(alias)
    this.router.navigate(['dashboard'])
  }
}
