import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ConfigService } from '@balnc/core';

@Injectable()
export class ConfigGuard implements CanActivate {
  constructor(
    private router: Router,
    private configService: ConfigService
  ) { }

  canActivate() {
    return !!this.configService.profile
    // if (this.profileService.selected) {
    //   return true
    // }
    // this.router.navigate(["profiles"])
    // return false
  }
}
