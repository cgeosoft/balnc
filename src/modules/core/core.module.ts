import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { WelcomeModule } from './welcome/welcome.module'
import { ProfileModule } from '@blnc/core/profile/profile.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { CommonModule } from '@blnc/common/common.module'
import { MainModule } from '@blnc/core/main/main.module'

@NgModule({
  imports: [
    CommonModule,
    MainModule,
    DashboardModule,
    ProfileModule,
    WelcomeModule,
  ],
  declarations: [],
  providers: [],
})
export class CoreModule { }
