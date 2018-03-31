import { NgModule } from '@angular/core';

import { DatabaseModule } from '@blnc/core/database/database.module';
import { Entity } from '@blnc/core/database/models/entity';
import { ProfileSchema } from '@blnc/core/profile/data/profile';
import { CommonModule } from '@blnc/core/common/common.module';
import { ManangeComponent } from '@blnc/core/profile/components/manage/manage.component';
import { RouterModule, Routes } from '@angular/router';
import { DefaultProfileGuard } from '@blnc/core/profile/guards/profile.guard';
import { CreateProfileComponent } from '@blnc/core/profile/components/create/create.component';
import { ProfileService } from '@blnc/core/profile/services/profile.service';
import { LoginComponent } from '@blnc/core/profile/components/login/login.component';
import { RegisterComponent } from '@blnc/core/profile/components/register/register.component';
import { DatabaseService } from '@blnc/core/database/services/database.service';
import { MainComponent } from '@blnc/core/main/main.component';

const routes: Routes = [{
  path: '',
  resolve: {
    service: ProfileService
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
    CreateProfileComponent,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    ProfileService,
    DefaultProfileGuard
  ],
  entryComponents: [
    CreateProfileComponent
  ]
})
export class ProfileModule { }
