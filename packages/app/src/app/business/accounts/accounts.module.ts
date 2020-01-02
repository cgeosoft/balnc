import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { AccountComponent } from './account/account.component'
import { AccountsComponent } from './accounts/accounts.component'

@NgModule({
  declarations: [
    AccountsComponent,
    AccountComponent
  ],
  entryComponents: [
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: AccountsComponent },
      { path: ':id', component: AccountComponent }
    ])
  ]
})
export class AccountsModule { }
