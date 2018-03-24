import { NgModule } from '@angular/core';

import { DatabaseModule } from '@blnc/core/database/database.module';
import { Entity } from '@blnc/core/database/models/entity';
import { AccountSchema } from '@blnc/core/accounts/data/account';
import { CommonModule } from '@blnc/core/common/common.module';
import { ManangeComponent } from '@blnc/core/accounts/components/manage/manage.component';
import { RouterModule, Routes } from '@angular/router';
import { DefaultAccountGuard } from '@blnc/core/accounts/guards/account.guard';
import { CreateAccountComponent } from '@blnc/core/accounts/components/create/create.component';
import { AccountsService } from '@blnc/core/accounts/services/accounts.service';
import { LoginComponent } from '@blnc/core/accounts/components/login/login.component';
import { RegisterComponent } from '@blnc/core/accounts/components/register/register.component';
import { DatabaseService } from '@blnc/core/database/services/database.service';
import { MainComponent } from '@blnc/core/main/main.component';

const routes: Routes = [{
  path: '',
  resolve: {
    service: AccountsService
  },
  children: [{
    path: 'manage',
    component: ManangeComponent,
  }]
  // }, {
  //   path: 'login',
  //   component: LoginComponent
  // }, {
  //   path: 'register',
  //   component: RegisterComponent
}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ManangeComponent,
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
