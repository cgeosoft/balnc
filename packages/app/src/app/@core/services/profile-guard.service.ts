import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { ConfigService } from './config.service'

@Injectable({
  providedIn: 'root'
})
export class ProfileGuardService implements CanActivate {
  constructor (public config: ConfigService, public router: Router) { }
  async canActivate () {
    this.config.setup()
    return !this.config.profile
  }
}
