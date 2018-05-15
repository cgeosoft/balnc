import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from '@balnc/common/common.module'
import { WelcomeGuard } from '@balnc/core/welcome/welcome.guard'

import { DefaultProfileGuard } from '@balnc/core/profile/guards/profile.guard'
import { ProfileService } from '@balnc/core/profile/services/profile.service'
import { ProfilesComponent } from '@balnc/core/profile/components/profiles/profiles.component'
import { ProfileComponent } from '@balnc/core/profile/components/profile/profile.component'
import { LoginComponent } from '@balnc/core/profile/components/login/login.component'

const routes: Routes = [{
  path: 'profiles',
  component: ProfilesComponent,
  canActivate: [
    WelcomeGuard
  ],
}, {
  path: 'profile',
  component: ProfileComponent,
  canActivate: [
    WelcomeGuard
  ],
}, {
  path: 'profile/:alias',
  component: ProfileComponent,
  canActivate: [
    WelcomeGuard
  ],
}, {
  path: 'login',
  component: LoginComponent,
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
    LoginComponent,
  ],
  providers: [
    ProfileService,
    DefaultProfileGuard
  ],
  entryComponents: []
})
export class ProfileModule { }
