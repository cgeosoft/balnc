import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { AceEditorModule } from 'ng2-ace-editor'
import { ShellComponent } from './@shell/shell.component'
import { DemoDataComponent } from './demo-data/demo-data.component'
import { DeveloperComponent } from './developer/developer.component'
import { GeneralComponent } from './general/general.component'
import { PluginsComponent } from './plugins/plugins.component'
import { CreateProfileComponent } from './profiles/create-profile/create-profile.component'
import { ProfilesComponent } from './profiles/profiles.component'
import { RawViewComponent } from './raw-view/raw-view.component'
import { RemoteComponent } from './remote/remote.component'
import { SettingsRoutes } from './settings.routes'

@NgModule({
  imports: [
    SharedModule,
    AceEditorModule,
    RouterModule.forChild(SettingsRoutes)
  ],
  declarations: [
    ShellComponent,
    GeneralComponent,
    PluginsComponent,
    RemoteComponent,
    RawViewComponent,
    ProfilesComponent,
    CreateProfileComponent,
    DeveloperComponent,
    DemoDataComponent
  ],
  entryComponents: [
    RawViewComponent,
    CreateProfileComponent
  ]
})
export class SettingsModule { }
