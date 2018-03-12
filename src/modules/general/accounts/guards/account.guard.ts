import { DatabaseService } from '@blnc/core/database/services/database.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { RxAccountDocument } from '@blnc/general/accounts/data/account';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(
    private router: Router,
    private dbService: DatabaseService,
  ) { }

  canActivate() {
    return this.HasAccounts()
  }

  async HasAccounts() {

    const dbAccounts = await this.dbService.get<RxAccountDocument>("account")
    const accounts = await dbAccounts.find().exec()

    if (accounts.length > 0) {
      this.router.navigate(['/dashboard']);
      return true;
    } else {
      this.router.navigate(['/manage']);
    }
    return false;

    // console.log("this.accounts", this.accounts)
    // if (!this.accounts) {
    //   this.createAccount()
    //   return
    // }

    // let alias = localStorage.getItem("selectedAccount")

    // if (!alias) {
    //   alias = this.accounts[0].alias
    // }

    // this.selectAccount(this.accounts[0])
  }

}
