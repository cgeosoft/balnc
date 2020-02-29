import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { ConfigService, RxDBService } from '@balnc/core'

@Injectable()
export class MainGuard implements CanActivate {

  constructor (
    private rxdbService: RxDBService,
    private configService: ConfigService,
    private router: Router) { }

  async canActivate () {
    if (!this.configService.profiles.length) {
      await this.router.navigate(['/setup'])
      return false
    }
    this.configService.setup()

    if (this.rxdbService.needAuthenticate()) {
      const password = prompt('remote data password')
      await this.rxdbService.authenticate(password)
    }

    await this.rxdbService.setup()
    return true
  }
}
