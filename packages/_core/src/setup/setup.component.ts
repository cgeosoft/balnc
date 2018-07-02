import { Component, OnDestroy, OnInit } from '@angular/core'
import { ConfigService } from '@balnc/common'
import { ProfileService } from '../profile/services/profile.service'
import { Profile } from '../profile/data/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'core-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit, OnDestroy {

  accepted: boolean

  constructor(
    private profileService: ProfileService,
    private router: Router,
  ) { }


  Ok() {
    localStorage.setItem("welcomeShown", "OK")
    this.router.navigate(["profiles"])
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  addDemoProfile() {

    const demoProfile = {
      "name": "Demo Company",
      "key": "demo",
      "remote": {
        "prefix": "demo",
        "host": "https://s2.cgeosoft.com"
      },
      "modules": {
        "@balnc/business": {
          "enabled": true,
          "menu": {
            "invoices": true
          }
        },
        "@balnc/marketing": {
          "enabled": true,
          "menu": {
            "presentations": true
          }
        },
        "@balnc/teams": {
          "enabled": true,
          "menu": {
            "projects": true,
            "boards": true
          }
        }
      },
      "params": null
    }

    const newProfile: Profile = <Profile>Object.assign({}, demoProfile)
    const alias = this.profileService.save(newProfile)

    this.profileService.select(alias)
    this.router.navigate(['dashboard'])
  }
}
