import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core'

import { CommonModule } from '@balnc/common'

import { MainComponent } from './main/main.component'
import { StatusBarComponent } from './status-bar/status-bar.component'

import { WelcomeModule } from './welcome/welcome.module'
import { ProfileModule } from './profile/profile.module'
import { DashboardModule } from './dashboard/dashboard.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    WelcomeModule,
    ProfileModule,
    DashboardModule,
  ],
  declarations: [
    StatusBarComponent,
    MainComponent,
  ],
  exports: [
    StatusBarComponent,
    MainComponent,

    WelcomeModule,
    ProfileModule,
    DashboardModule,
  ]
})
export class CoreModule { }
