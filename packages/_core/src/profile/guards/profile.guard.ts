import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'

import { ProfileService } from '../services/profile.service'

@Injectable()
export class DefaultProfileGuard implements CanActivate {
  constructor(
    private router: Router,
    private profileService: ProfileService
  ) { }

  canActivate() {
    return !!this.profileService.selected
    // if (this.profileService.selected) {
    //   return true
    // }
    // this.router.navigate(["profiles"])
    // return false
  }
}
