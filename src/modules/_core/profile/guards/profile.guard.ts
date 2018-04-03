import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { ProfileService } from '@blnc/core/profile/services/profile.service';

@Injectable()
export class DefaultProfileGuard implements CanActivate {
  constructor(
    private router: Router,
    private profileService: ProfileService,
  ) { }

  canActivate() {
    return true
    // if (!this.profileService.hasProfile()) {
    //   this.router.navigate(["/start"])
    //   return false
    // }
    // return true
  }
}
