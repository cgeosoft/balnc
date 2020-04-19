import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { ShellComponent } from './@shell/shell.component'
import { AccountComponent } from './account/account.component'
import { AccountsComponent } from './accounts/accounts.component'
import { OverviewComponent } from './overview/overview.component'
import { TransactionComponent } from './transaction/transaction.component'
import { TransactionsComponent } from './transactions/transactions.component'

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionComponent,
    OverviewComponent,
    AccountComponent,
    ShellComponent,
    AccountsComponent
  ],
  entryComponents: [
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: ShellComponent,
      children: [{
        path: 'overview',
        component: OverviewComponent
      }, {
        path: 'transactions/:id',
        component: TransactionComponent
      }, {
        path: 'transactions',
        component: TransactionsComponent
      }, {
        path: 'accounts/:id',
        component: AccountComponent
      }, {
        path: 'accounts',
        component: AccountsComponent
      }, {
        path: '', pathMatch: 'full', redirectTo: 'overview'
      }]
    }])
  ]
})
export class PaymentsModule { }
