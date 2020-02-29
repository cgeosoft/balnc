import { ShellComponent } from './@shell/shell.component'
import { DebugComponent } from './debug/debug.component'
import { GeneralComponent } from './general/general.component'
import { PluginsComponent } from './plugins/plugins.component'
import { ProfilesComponent } from './profiles/profiles.component'

export const SettingsRoutes = [{
  path: '',
  component: ShellComponent,
  data: {
    title: 'Settings'
  },
  children: [
    {
      path: 'general',
      data: {
        title: 'General'
      },
      component: GeneralComponent
    },
    {
      path: 'plugins',
      data: {
        title: 'Plugins'
      },
      component: PluginsComponent
    },
    {
      path: 'profiles',
      data: {
        title: 'Profiles'
      },
      component: ProfilesComponent
    },    {
      path: 'debug',
      data: {
        title: 'Debug'
      },
      component: DebugComponent
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: '/settings/general'
    }
  ]
}]
