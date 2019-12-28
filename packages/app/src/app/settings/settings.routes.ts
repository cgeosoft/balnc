import { ShellComponent } from './@shell/shell.component'
import { AboutComponent } from './about/about.component'
import { GeneralComponent } from './general/general.component'
import { PluginsComponent } from './plugins/plugins.component'

export const SettingsRoutes = [{
  path: '',
  component: ShellComponent,
  children: [
    { path: 'general', component: GeneralComponent },
    { path: 'plugins', component: PluginsComponent },
    { path: 'about', component: AboutComponent },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: '/settings/general'
    }
  ]
}]
