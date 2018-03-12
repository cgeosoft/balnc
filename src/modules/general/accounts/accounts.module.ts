import { NgModule } from '@angular/core';

import { DatabaseModule } from '@blnc/core/database/database.module';
import { Entity } from '@blnc/core/database/models/entity';
import { AccountSchema } from '@blnc/general/accounts/data/account';
import { CommonModule } from '@blnc/core/common/common.module';
import { AccountManangementComponent } from '@blnc/general/accounts/components/account-manangement/account-manangement.component';
import { RouterModule, Routes } from '@angular/router';
import { DefaultAccountGuard } from '@blnc/general/accounts/guards/account.guard';
import { CreateAccountComponent } from '@blnc/general/accounts/components/create-account/create-account.component';
import { AccountsService } from '@blnc/general/accounts/services/accounts.service';
import { LoginComponent } from '@blnc/general/accounts/components/login/login.component';
import { RegisterComponent } from '@blnc/general/accounts/components/register/register.component';

const entities: Entity[] = [{
  name: 'account',
  schema: AccountSchema,
  sync: false,
}]

const routes: Routes = [{
  path: 'manage',
  component: AccountManangementComponent,
  resolve: {
    service: AccountsService
  },
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
}]

@NgModule({
  imports: [
    CommonModule,
    DatabaseModule.forChild(entities),
    RouterModule.forChild(routes),
  ],
  declarations: [
    AccountManangementComponent,
    CreateAccountComponent,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    AccountsService,
    DefaultAccountGuard
  ],
  entryComponents: [
    CreateAccountComponent
  ]
})
export class AccountsModule { }
