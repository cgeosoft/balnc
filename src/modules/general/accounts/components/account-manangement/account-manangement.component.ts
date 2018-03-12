import { Component, OnInit, ViewChild } from '@angular/core'
import { DatabaseService } from '@blnc/core/database/services/database.service'
import { RxAccountDocument } from '@blnc/general/accounts/data/account'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RxCollection } from 'rxdb';
import { CreateAccountComponent } from '@blnc/general/accounts/components/create-account/create-account.component';
import { AccountsService } from '@blnc/general/accounts/services/accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-manangement',
  templateUrl: './account-manangement.component.html',
  styleUrls: ['./account-manangement.component.scss'],
  providers: [
    NgbActiveModal,
  ]
})
export class AccountManangementComponent implements OnInit {

  alias: any;
  selectedAccount: RxAccountDocument
  accounts: RxAccountDocument[] = []
  dbAccounts: RxCollection<any>

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private dbService: DatabaseService,
    private accountService: AccountsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.setup()
  }

  private async setup() {
    this.dbAccounts = await this.dbService.get<RxAccountDocument>("account")
    this.getAccounts()
  }

  async getAccounts() {
    this.accounts = await this.dbAccounts.find().exec()
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
    // this.router.navigate(['/dashboard']);
  }
}
