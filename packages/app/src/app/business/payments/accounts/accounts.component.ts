import { Component, OnInit } from '@angular/core'
import { TableSchema } from '@balnc/shared'
import { Observable } from 'rxjs'
import { Account, AccountType, AccountTypeBadges } from '../../_shared/models/account'
import { AccountsRepo } from '../../_shared/repos/accounts.repo'
import { RecordsRepo } from '../../_shared/repos/records.repo'

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  host: { 'class': 'page' }
})
export class AccountsComponent implements OnInit {

  schema: TableSchema = {
    name: 'accounts',
    properties: [
      {
        label: 'Name', type: 'link', locked: true, val: (item: Account) => {
          return {
            label: item.name,
            link: ['/business/payments/accounts', item._id]
          }
        }
      },
      { label: 'Type', style: { width: '90px' }, type: 'badge', badges: AccountTypeBadges, val: (item: Account) => AccountType[item.type] },
      { label: 'Contact', val: (item: Account) => item.contact },
      {
        label: 'Amount', style: { 'text-align': 'right' }, type: 'currency', locked: true,
        val: (item: Account) => this.totals[item._id] ? this.totals[item._id].amount : 0
      }
    ]
  }

  accounts$: Observable<Account[]> = new Observable<Account[]>()
  totals: { [key: string]: { amount: number, records: number } } = {}

  constructor (
    private accountsRepo: AccountsRepo,
    private recordsRepo: RecordsRepo
  ) { }

  async ngOnInit () {
    this.recordsRepo.all$().subscribe((records) => {
      this.totals = records
        .reduce((m, d) => {
          if (!m[d.account]) {
            m[d.account] = { amount: 0, records: 0 }
          }
          m[d.account].amount += d.amount
          m[d.account].records += 1
          return m
        }, {})
    })
    this.accounts$ = this.accountsRepo.all$()
  }
}
