import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { SettingsComponent } from './settings.component'

const appRoutes: Routes = [
  { path: '', component: SettingsComponent },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    SettingsComponent
  ],
  providers: [
  ]
})
export class SettingsModule { }
