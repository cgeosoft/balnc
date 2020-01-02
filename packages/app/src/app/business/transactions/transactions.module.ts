import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { TransactionComponent } from './transaction/transaction.component'
import { TransactionsComponent } from './transactions/transactions.component'

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionComponent
  ],
  entryComponents: [
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: TransactionsComponent },
      { path: ':id', component: TransactionComponent }
    ])
  ]
})
export class TransactionsModule { }
