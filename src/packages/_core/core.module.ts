import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { CommonModule } from '@balnc/common'

import { BoxComponent } from './box/box.component'
import { ErrorComponent } from './error/error.component'
import { SetupComponent } from './setup/setup.component'
import { MainComponent } from './main/main.component'
import { DashboardModule } from './dashboard/dashboard.module'
import { SettingsModule } from './settings/settings.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),

    DashboardModule,
    SettingsModule
  ],
  declarations: [
    BoxComponent,
    ErrorComponent,
    SetupComponent,
    MainComponent
  ],
  exports: [
    BoxComponent,
    ErrorComponent,
    SetupComponent,
    MainComponent,

    DashboardModule,
    SettingsModule
  ]
})
export class CoreModule { }
