import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { CommonModule } from '@balnc/common'

import { SetupComponent } from './setup/setup.component'
import { MainComponent } from './main/main.component'
import { DashboardModule } from './dashboard/dashboard.module'
import { SettingsModule } from './settings/settings.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),

    DashboardModule,
    SettingsModule,
  ],
  declarations: [
    SetupComponent,
    MainComponent
  ],
  exports: [
    SetupComponent,
    MainComponent,

    DashboardModule,
    SettingsModule
  ]
})
export class CoreModule { }
