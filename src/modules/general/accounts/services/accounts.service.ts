import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RxCollection } from 'rxdb';
import { RxAccountDocument } from '@blnc/general/accounts/data/account';
import { DatabaseService } from '@blnc/core/database/services/database.service';

@Injectable()
export class AccountsService implements Resolve<any> {

    accounts: RxCollection<RxAccountDocument>

    constructor(
        private dbService: DatabaseService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        this.setup()
        return true
    }

    async setup() {
        this.accounts = await this.dbService.get<RxAccountDocument>("account")
    }

    addAccount(alias: string, name: string) {
        const account = this.accounts.newDocument({
            name: name,
            alias: alias,
        })
        return account.save()
    }

}
