import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { PresentationsService } from './services/presentations.service'

@Injectable()
export class Resolver implements Resolve<void> {
  constructor (
    private presentationsService: PresentationsService
  ) { }

  async resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.presentationsService.setup()
  }
}
