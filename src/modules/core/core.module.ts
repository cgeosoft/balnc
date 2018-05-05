import { NgModule } from '@angular/core'

import { CommonModule } from '@balnc/common/common.module';

import { WelcomeModule } from '@balnc/core/welcome/welcome.module'
import { ProfileModule } from '@balnc/core/profile/profile.module'
import { DashboardModule } from '@balnc/core/dashboard/dashboard.module'
import { MainModule } from '@balnc/core/main/main.module'

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
