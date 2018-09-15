import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@balnc/common'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { GeneralComponent } from './components/general/general.component'
import { PackageComponent } from './components/package/package.component'
import { ManageComponent } from './components/manage/manage.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    WrapperComponent,
    GeneralComponent,
    PackageComponent,
    ManageComponent
  ],
  providers: [],
  entryComponents: []
})
export class SettingsModule { }
