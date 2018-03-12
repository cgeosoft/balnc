import { Component, OnInit, ViewChild } from '@angular/core'
import { DatabaseService } from '@blnc/core/database/services/database.service'
import { RxAccountDocument } from '@blnc/general/accounts/data/account'
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

  selectedAccount: RxAccountDocument
  accounts: RxAccountDocument[] = []
  dbAccounts: RxCollection<any>

  constructor(
    private dbService: DatabaseService,
  ) { }

  ngOnInit() {
    this.setup()
  }

  private async setup() {

    this.dbAccounts = await this.dbService.get<RxAccountDocument>("account")
    this.accounts = await this.dbAccounts.find().exec()

    let alias = localStorage.getItem("selectedAccount")

    if (!alias) {
      alias = this.accounts[0].alias
    }

    localStorage.setItem("selectedAccount", alias)
    this.selectedAccount = this.accounts.find((account) => {
      return account.alias === alias
    })
  }
}
