import { NgModule } from '@angular/core'

import { DefaultProfileGuard } from '@blnc/core/profile/guards/profile.guard'
import { ProfileService } from '@blnc/core/profile/services/profile.service'

import { CommonModule } from '@blnc/common/common.module';
import { ProfilesComponent } from '@blnc/core/profile/components/profiles/profiles.component'
import { RouterModule, Routes } from '@angular/router';
import { WelcomeGuard } from '@blnc/core/welcome/welcome.guard';
import { ProfileComponent } from '@blnc/core/profile/components/profile/profile.component';

const routes: Routes = [{
  path: 'profiles',
  component: ProfilesComponent,
  canActivate: [
    WelcomeGuard
  ],
}, {
  path: 'profile/:alias',
  component: ProfileComponent,
  canActivate: [
    WelcomeGuard
  ],
}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ProfilesComponent,
    ProfileComponent,
  ],
  providers: [
    ProfileService,
    DefaultProfileGuard
  ],
  entryComponents: []
})
export class ProfileModule { }
