import { NgModule } from '@angular/core'

import { CommonModule } from '@blnc/core/common/common.module'

import { DefaultProfileGuard } from '@blnc/core/profile/guards/profile.guard'
import { ProfileService } from '@blnc/core/profile/services/profile.service'

import { ProfilesComponent } from '@blnc/core/profile/components/profiles/profiles.component'
import { CreateProfileComponent } from '@blnc/core/profile/components/create/create.component'
import { RouterModule, Routes } from '@angular/router';
import { WelcomeGuard } from '@blnc/core/welcome/welcome.guard';

const routes: Routes = [{
  path: '',
  canActivate: [WelcomeGuard],
  children: [{
    path: 'profiles',
    component: ProfilesComponent,
  }]
}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ProfilesComponent,
    CreateProfileComponent,
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
