import { Component, OnInit, ViewChild } from '@angular/core'
import { DatabaseService } from '@blnc/core/database/services/database.service'
import { RxAccountDocument } from '@blnc/general/accounts/data/account'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RxCollection } from 'rxdb';
import { AccountsService } from '@blnc/general/accounts/services/accounts.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [
    NgbActiveModal,
  ]
})
export class MainComponent implements OnInit {

  account: RxAccountDocument

  constructor(
    private accountsService: AccountsService,
    private dbService: DatabaseService,
  ) { }

  ngOnInit() {
    this.setup()
  }

  private async setup() {
    this.account = this.accountsService.selectedAccount
  }
}
