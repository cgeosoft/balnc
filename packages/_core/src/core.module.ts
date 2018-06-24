import { NgModule } from '@angular/core'

import { CommonModule } from '@balnc/common/common.module';

import { WelcomeModule } from 'welcome/welcome.module'
import { ProfileModule } from 'profile/profile.module'
import { MainModule } from 'main/main.module'

@NgModule({
  imports: [
    CommonModule,
    WelcomeModule,
    ProfileModule,
    MainModule,
  ],
})
export class CoreModule { }
