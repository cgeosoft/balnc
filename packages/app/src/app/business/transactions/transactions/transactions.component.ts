import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TableSchema } from '@balnc/shared'
import { BehaviorSubject, Observable } from 'rxjs'
import { Account } from '../../@shared/models/account'
import { Transaction } from '../../@shared/models/transaction'
import { AccountsRepo } from '../../@shared/repos/accounts.repo'
import { TransactionsRepo } from '../../@shared/repos/transactions.repo'

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html'

})
export class TransactionsComponent implements OnInit {

  schema: TableSchema = {
    name: 'transactions',
    properties: [
      { label: 'Status', style: { 'width': '180px' }, template: 'statusTpl', locked: true },
      { label: '', style: { 'min-width': '300px', 'text-align': 'right' }, template: 'accountFromTpl', locked: true },
      { label: '', style: { 'width': '30px', 'color': '#AAA', 'text-align': 'center' }, type: 'icon', locked: true, val: () => { return 'arrow-alt-circle-right' } },
      { label: '', style: { 'min-width': '300px' }, template: 'accountToTpl', locked: true },
      { label: 'Amount', style: { 'width': '120px', 'text-align': 'right' }, type: 'currency', val: (item: Transaction) => item.amount },
      {
        label: '', style: { 'width': '80px', 'text-align': 'center' },type: 'button', icon: 'bars', click: async (item: Transaction) => {
          await this.router.navigate(['/business/payments/transactions', item._id])
        }
      }
    ]
  }

  transactions$: Observable<Transaction[]> = new Observable<Transaction[]>()
  term$: BehaviorSubject<string> = new BehaviorSubject<string>(null)
  accounts: { [key: string]: Account }

  constructor (
    private accountsRepo: AccountsRepo,
    private transactionsRepo: TransactionsRepo,
    private router: Router
  ) { }

  async ngOnInit () {
    this.accountsRepo.all$().subscribe((accounts) => {
      this.accounts = accounts.reduce((m, d) => {
        m[d._id] = d
        return m
      }, {})
    })
    this.transactions$ = this.transactionsRepo.all$()
  }
}
