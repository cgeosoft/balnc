import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { ProfileService } from '@blnc/core/profile/services/profile.service'

@Injectable()
export class DefaultProfileGuard implements CanActivate {
  constructor(
    private router: Router,
    private profileService: ProfileService
  ) { }

  canActivate() {
    if (this.profileService.config && this.profileService.config.selected) {
      return true
    }
    this.router.navigate(["profiles"])
    return false
  }
}
