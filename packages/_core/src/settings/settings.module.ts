import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { FileHelpersModule } from 'ngx-file-helpers'

import { CommonModule } from '@balnc/common'

import { SettingsWrapperComponent } from './components/_wrapper/settings-wrapper.component'
import { SettingsComponent } from './components/settings/settings.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: SettingsWrapperComponent,
      children: [
        {
          path: ':alias',
          component: SettingsComponent
        },
      ],
    }]),
  ],
    declarations: [
      SettingsWrapperComponent,
      SettingsComponent,
    ],
    providers: [],
    entryComponents: []
})
export class SettingsModule { }
