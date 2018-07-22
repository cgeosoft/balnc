import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { FileHelpersModule } from 'ngx-file-helpers'

import { CommonModule } from '@balnc/common'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { ProfileComponent } from './components/profile/profile.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    WrapperComponent,
    ProfileComponent,
  ],
  providers: [],
  entryComponents: []
})
export class SettingsModule { }
