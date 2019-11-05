import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';
import { AccountsComponent } from './accounts/accounts.component';
import { OverviewComponent } from './overview/overview.component';
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [
    OverviewComponent,
    AccountsComponent,
    TransactionsComponent
  ],
  entryComponents: [
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'transactions', component: TransactionsComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: '', redirectTo: 'transactions', pathMatch: 'full' }
    ])
  ]
})
export class PaymentsModule { }
