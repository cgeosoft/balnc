import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RxCollection } from 'rxdb';
import { RxAccountDocument, AccountSchema } from '@blnc/core/accounts/data/account';
import { DatabaseService } from '@blnc/core/database/services/database.service';
import { ConfigService } from '@blnc/core/config/config.service';
import { Entity } from '@blnc/core/database/models/entity';

const entities: Entity[] = [{
    name: 'account',
    schema: AccountSchema,
    sync: false,
    single: true
}]

@Injectable()
export class AccountsService implements Resolve<any> {

    accountsDB: RxCollection<RxAccountDocument>

    constructor(
        private dbService: DatabaseService,
        private configService: ConfigService,
    ) {
        console.log("AccountsService constructor")
        this.setup()
    }

    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        console.log("AccountsService resolve")
        return this.setup()
    }

    async setup() {
        console.log("AccountsService setup")
        await this.dbService.setup(entities)
        this.accountsDB = await this.dbService.get<RxAccountDocument>("account")
        console.log("loaded", this.accountsDB)
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

        const account = accounts.find(x => {
            return x.alias === alias
        })

        this.configService.$account.next(account)

        if (this.selectAccount) {
            localStorage.setItem("account", alias)
            this.dbService.setNamespace(alias)
        }
    }
}
