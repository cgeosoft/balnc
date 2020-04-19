import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Transaction } from '../@shared/model/transaction'
import { TransactionsRepo } from '../@shared/repo/transactions.repo'

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html'

})
export class TransactionComponent implements OnInit {

  transaction: Transaction

  constructor (
    private transactionsRepo: TransactionsRepo,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  async ngOnInit () {
    const id = this.route.snapshot.paramMap.get('id')
    this.transaction = await this.transactionsRepo.one(id)
    if (!this.transaction) {
      await this.router.navigate([`/contacts`])
    }
  }

  async update () {
    await this.transactionsRepo.update(this.transaction._id, {
      from: this.transaction.from,
      to: this.transaction.to,
      amount: this.transaction.amount,
      executed: this.transaction.executed,
      planned: this.transaction.planned,
      aggreement: this.transaction.aggreement,
      invoice: this.transaction.invoice
    })
    this.toastr.success('Saved')
  }
}
