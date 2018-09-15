import { Routes } from '@angular/router'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { ProfileComponent } from './components/profile/profile.component'

export const SettingsRoutes: Routes = [{
  path: 'settings',
  component: WrapperComponent,
  children: [
    { path: ':alias', component: ProfileComponent }]
}]
