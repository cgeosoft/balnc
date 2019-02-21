import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';
import { AboutComponent } from './about/about.component';
import { DataComponent } from './data/data.component';
import { GeneralComponent } from './general/general.component';
import { HelpComponent } from './help/help.component';
import { PluginsComponent } from './plugins/plugins.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { SettingsRoutes } from './settings.routes';
import { ShellComponent } from './_shell/shell.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(SettingsRoutes)
  ],
  declarations: [
    ShellComponent,
    GeneralComponent,
    DataComponent,
    PluginsComponent,
    AboutComponent,
    HelpComponent,
    ProfilesComponent
  ],
  providers: [],
  entryComponents: []
})
export class SettingsModule { }
