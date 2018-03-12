import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RxCollection } from 'rxdb';
import { RxAccountDocument } from '@blnc/general/accounts/data/account';
import { DatabaseService } from '@blnc/core/database/services/database.service';

@Injectable()
export class AccountsService implements Resolve<any> {

    selectedAccount: RxAccountDocument
    accountsDB: RxCollection<RxAccountDocument>

    constructor(
        private dbService: DatabaseService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        return this.setup()
    }

    async setup() {
        console.log("set", "AccountsService")
        this.accountsDB = await this.dbService.get<RxAccountDocument>("account")

        const defaultAccount = localStorage.getItem("account")
        if (defaultAccount) {
            await this.selectAccount(defaultAccount)
        }
    }

    addAccount(alias: string, name: string) {
        const account = this.accountsDB.newDocument({
            alias: alias,
            name: name,
        })
        return account.save()
    }

    async getAccounts() {
        return await this.accountsDB.find().exec();
    }

    async selectAccount(alias: string) {
        const accounts = await this.getAccounts()

        this.selectedAccount = accounts.find(x => {
            return x.alias === alias
        })

        if (this.selectAccount) {
            localStorage.setItem("account", alias)
            this.dbService.dbspace = alias
        }
    }
}
