import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Account } from '../@shared/model/account'
import { AccountsRepo } from '../@shared/repo/accounts.repo'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'

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
      await this.router.navigate([`/contacts`])
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
