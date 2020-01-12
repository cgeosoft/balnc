import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { ShellComponent } from './@shell/shell.component'
import { GeneralComponent } from './general/general.component'
import { PluginsComponent } from './plugins/plugins.component'
import { RemoteComponent } from './remote/remote.component'
import { SettingsRoutes } from './settings.routes'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(SettingsRoutes)
  ],
  declarations: [
    ShellComponent,
    GeneralComponent,
    PluginsComponent,
    RemoteComponent
  ],
  providers: [],
  entryComponents: [
    RemoteComponent
  ]
})
export class SettingsModule { }
