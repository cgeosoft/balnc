import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { RxDBService } from './rxdb/rxdb.service'

@Injectable()
export class MainResolver implements Resolve<void> {
  constructor(private rxdbService: RxDBService) { }
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.rxdbService.setup()
  }
}
