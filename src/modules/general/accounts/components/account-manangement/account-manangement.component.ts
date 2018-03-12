import { Component, OnInit, ViewChild } from '@angular/core'
import { DatabaseService } from '@blnc/core/database/services/database.service'
import { RxAccountDocument } from '@blnc/general/accounts/data/account'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RxCollection } from 'rxdb';
import { CreateAccountComponent } from '@blnc/general/accounts/components/create-account/create-account.component';

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

  @ViewChild('accountForm') accountForm
  @ViewChild('accountsView') accountsView

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private dbService: DatabaseService,
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

  select(account: RxAccountDocument) {
    localStorage.setItem("selectedAccount", account.alias)
    this.selectedAccount = account
  }
}
