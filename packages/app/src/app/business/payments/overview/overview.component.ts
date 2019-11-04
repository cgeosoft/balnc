import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Account, AccountsRepo } from '../../_shared/repos/accounts.repo'
import { CEventsRepo } from '../../_shared/repos/cevents.repo'
import { OrdersRepo } from '../../_shared/repos/orders.repo'
import { Record, RecordsRepo } from '../../_shared/repos/records.repo'
import { DemoService } from '../../_shared/services/demo.service'

@Component({
  selector: 'app-payments-overview',
  templateUrl: './overview.component.html',
  host: { 'class': 'page' }
})
export class OverviewComponent implements OnInit {

  accounts: Account[]
  records: Record[]
  totals: { [key: string]: { amount: number, records: number } }

  constructor(
    private demoService: DemoService,
    private recordsRepo: RecordsRepo,
    private accountsRepo: AccountsRepo,
    private ceventsService: CEventsRepo,
    private ordersService: OrdersRepo,
    private router: Router
  ) { }

  reducer = (accumulator, currentValue) => accumulator + currentValue

  async ngOnInit() {
    await this.demoService.generateOwnAccount()

    const accounts = await this.accountsRepo.all()
    this.totals = accounts
      .reduce((m, d) => {
        m[d._id] = { amount: 0, records: 0 }
        return m
      }, {})

    this.records = await this.recordsRepo.all()
    const totals = this.records
      .reduce((m, d) => {
        if (!m[d.account]) {
          m[d.account] = { amount: 0, records: 0 }
        }
        m[d.account].amount += d.amount
        m[d.account].records += 1
        return m
      }, {})

    Object.keys(totals).forEach(k => {
      this.totals[k] = totals[k]
    })

    this.accounts = accounts
  }

}
