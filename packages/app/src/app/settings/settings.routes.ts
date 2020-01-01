import { ShellComponent } from './@shell/shell.component'
import { AboutComponent } from './about/about.component'
import { GeneralComponent } from './general/general.component'
import { PluginsComponent } from './plugins/plugins.component'

export const SettingsRoutes = [{
  path: '',
  component: ShellComponent,
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
      path: 'about',

      data: {
        breadcrumb: {
          label: 'About '
        }
      },
      component: AboutComponent
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: '/settings/general'
    }
  ]
}]
