import { Component, OnInit, ViewChild } from '@angular/core'
import { DatabaseService } from '@blnc/core/database/services/database.service'
import { RxAccountDocument } from '@blnc/core/accounts/data/account'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RxCollection } from 'rxdb';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [
    NgbActiveModal,
  ]
})
export class MainComponent implements OnInit {

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
    console.log("Zxc")
    this.dbAccounts = await this.dbService.get<RxAccountDocument>("account")
    this.accounts = await this.dbAccounts.find().exec()

    console.log("this.accounts", this.accounts)
    if (!this.accounts) {
      this.createAccount()
      return
    }

    let alias = localStorage.getItem("selectedAccount")

    if (!alias) {
      alias = this.accounts[0].alias
    }

    this.selectAccount(this.accounts[0])
  }

  createAccount() {
    console.log("Asd")
    this.modalService
      .open(this.accountForm)
      .result
      .then((result) => {
        console.log(`Closed with: ${result}`)
        this.selectAccount(result)
      }, (reason) => {
        console.log(`Dismissed ${reason}`)
      })
  }

  async saveAccount() {
    const doc = await this.dbAccounts.insert({
      alias: this.alias
    })
    return doc
  }

  selectAccount(account: RxAccountDocument) {
    localStorage.setItem("selectedAccount", account.alias)
    this.selectedAccount = account
  }

  viewAccounts() {
    this.modalService
      .open(this.accountsView)
      .result
      .then((result) => {
        console.log(`Closed with: ${result}`)
      }, (reason) => {
        console.log(`Dismissed ${reason}`)
      })
  }

}
