import { NgModule } from '@angular/core'

import { CommonModule } from '@blnc/common/common.module';

import { WelcomeModule } from '@blnc/core/welcome/welcome.module'
import { ProfileModule } from '@blnc/core/profile/profile.module'
import { DashboardModule } from '@blnc/core/dashboard/dashboard.module'
import { MainModule } from '@blnc/core/main/main.module'

@NgModule({
  imports: [
    CommonModule,
    WelcomeModule,
    ProfileModule,
    DashboardModule,
    MainModule,
  ],
})
export class CoreModule { }
