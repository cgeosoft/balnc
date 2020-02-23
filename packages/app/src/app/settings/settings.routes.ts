import { ShellComponent } from './@shell/shell.component'
import { GeneralComponent } from './general/general.component'
import { PluginsComponent } from './plugins/plugins.component'

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
      path: '',
      pathMatch: 'full',
      redirectTo: '/settings/general'
    }
  ]
}]
