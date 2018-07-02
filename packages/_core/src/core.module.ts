import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core'

import { CommonModule } from '@balnc/common'

import { MainComponent } from './main/main.component'
import { StatusBarComponent } from './status-bar/status-bar.component'
import { SetupComponent } from './setup/setup.component'

import { SettingsModule } from './settings/settings.module'
import { DashboardModule } from './dashboard/dashboard.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    SettingsModule,
    DashboardModule,
  ],
  declarations: [
    StatusBarComponent,
    MainComponent,
    SetupComponent,
  ],
  exports: [
    StatusBarComponent,
    MainComponent,
    SetupComponent,

    SettingsModule,
    DashboardModule,
  ]
})
export class CoreModule { }
