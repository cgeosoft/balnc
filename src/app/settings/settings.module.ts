import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'

import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { BModuleComponent } from './components/bmodule/bmodule.component'
import { DataComponent } from './components/data/data.component'
import { GeneralComponent } from './components/general/general.component'
import { ManageComponent } from './components/manage/manage.component'
import { SettingsRoutes } from './settings.routes'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(SettingsRoutes)
  ],
  declarations: [
    WrapperComponent,
    GeneralComponent,
    BModuleComponent,
    ManageComponent,
    DataComponent
  ],
  providers: [],
  entryComponents: []
})
export class SettingsModule { }
