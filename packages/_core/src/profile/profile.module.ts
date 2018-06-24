import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { FileHelpersModule } from 'ngx-file-helpers'

import { CommonModule } from '@balnc/common'

import { WelcomeGuard } from '../welcome/welcome.guard'

import { DefaultProfileGuard } from './guards/profile.guard'
import { ProfileService } from './services/profile.service'
import { ProfilesComponent } from './components/profiles/profiles.component'
import { ProfileComponent } from './components/profile/profile.component'
import { LoginComponent } from './components/login/login.component'

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
    FileHelpersModule,
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
