import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AccountsService implements Resolve<any> {
    constructor() {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        return Promise.resolve()
    }
}
