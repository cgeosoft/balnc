import { AboutComponent } from './about/about.component';
import { DataComponent } from './data/data.component';
import { GeneralComponent } from './general/general.component';
import { HelpComponent } from './help/help.component';
import { PluginsComponent } from './plugins/plugins.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ShellComponent } from './_shell/shell.component';

export const SettingsRoutes = [{
  path: '',
  component: ShellComponent,
  children: [
    { path: 'general', component: GeneralComponent },
    { path: 'profiles', component: ProfilesComponent },
    { path: 'data', component: DataComponent },
    { path: 'plugins', component: PluginsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'help', component: HelpComponent },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: '/settings/general'
    }
  ]
}]
