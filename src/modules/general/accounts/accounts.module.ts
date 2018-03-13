import { NgModule } from '@angular/core';

import { DatabaseModule } from '@blnc/core/database/database.module';
import { Entity } from '@blnc/core/database/models/entity';
import { AccountSchema } from '@blnc/general/accounts/data/account';
import { CommonModule } from '@blnc/core/common/common.module';
import { ManangeComponent } from '@blnc/general/accounts/components/manage/manage.component';
import { RouterModule, Routes } from '@angular/router';
import { DefaultAccountGuard } from '@blnc/general/accounts/guards/account.guard';
import { CreateAccountComponent } from '@blnc/general/accounts/components/create/create.component';
import { AccountsService } from '@blnc/general/accounts/services/accounts.service';
import { LoginComponent } from '@blnc/general/accounts/components/login/login.component';
import { RegisterComponent } from '@blnc/general/accounts/components/register/register.component';
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
