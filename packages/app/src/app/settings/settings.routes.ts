import { ShellComponent } from './@shell/shell.component'
import { GeneralComponent } from './general/general.component'
import { PluginsComponent } from './plugins/plugins.component'

export const SettingsRoutes = [{
  path: '',
  component: ShellComponent,
  data: {
    breadcrumb: {
      label: 'Settings'
    }
  },
  children: [
    {
      path: 'general',
      data: {
        breadcrumb: {
          label: 'General'
        }
      },
      component: GeneralComponent
    },
    {
      path: 'plugins',

      data: {
        breadcrumb: {
          label: 'Plugins'
        }
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
