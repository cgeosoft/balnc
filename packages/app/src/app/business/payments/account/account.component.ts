import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Account } from '../../_shared/models/account'
import { AccountsRepo } from '../../_shared/repos/accounts.repo'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  host: { 'class': 'page' }
})
export class AccountComponent implements OnInit {

  account: Account

  constructor (
    private accountsRepo: AccountsRepo,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  async ngOnInit () {
    const id = this.route.snapshot.paramMap.get('id')
    this.account = await this.accountsRepo.one(id)
    if (!this.account) {
      await this.router.navigate([`/business/contacts`])
    }
  }

  async update () {
    await this.accountsRepo.update(this.account._id, {
      name: this.account.name,
      contact: this.account.contact
    })
    this.toastr.success('Saved')
  }
}
