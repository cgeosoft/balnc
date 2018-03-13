import { Component, OnInit, ViewChild } from '@angular/core'
import { DatabaseService } from '@blnc/core/database/services/database.service'
import { RxAccountDocument } from '@blnc/general/accounts/data/account'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RxCollection } from 'rxdb';
import { CreateAccountComponent } from '@blnc/general/accounts/components/create/create.component';
import { AccountsService } from '@blnc/general/accounts/services/accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManangeComponent implements OnInit {

  alias: any;
  selectedAccount: RxAccountDocument
  accounts: RxAccountDocument[] = []
  dbAccounts: RxCollection<any>

  constructor(
    private modalService: NgbModal,
    private accountService: AccountsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAccounts()
  }

  async getAccounts() {
    this.accounts = await this.accountService.accountsDB.find().exec()
  }

  create() {
    this.modalService
      .open(CreateAccountComponent)
      .result
      .then((result) => {
        console.log(`Closed with: ${result}`)
        this.getAccounts()
        // this.selectAccount(result)
      }, (reason) => {
        console.log(`Dismissed ${reason}`)
      })
  }

  async select(account: RxAccountDocument) {
    await this.accountService.selectAccount(account.alias)
    console.log("Selected", account)
    this.router.navigate(['/dashboard']);
  }
}
