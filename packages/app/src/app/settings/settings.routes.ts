import { ShellComponent } from './@shell/shell.component'
import { DemoDataComponent } from './demo-data/demo-data.component'
import { DeveloperComponent } from './developer/developer.component'
import { GeneralComponent } from './general/general.component'
import { IntegrationsComponent } from './integrations/integrations.component'
import { RemoteComponent } from './remote/remote.component'
import { WorkspacesComponent } from './workspaces/workspaces.component'

export const SettingsRoutes = [{
  path: '',
  component: ShellComponent,
  data: {
    title: 'Settings'
  },
  children: [{
    path: 'general',
    data: {
      title: 'General'
    },
    component: GeneralComponent
  }, {
    path: 'integrations',
    data: {
      title: 'Integrations'
    },
    component: IntegrationsComponent
  }, {
    path: 'workspaces',
    data: {
      title: 'Workspaces'
    },
    component: WorkspacesComponent
  }, {
    path: 'developer',
    data: {
      title: 'Debug'
    },
    component: DeveloperComponent
  }, {
    path: 'demo-data',
    data: {
      title: 'Demo Data'
    },
    component: DemoDataComponent
  }, {
    path: 'remote',
    data: {
      title: 'remote'
    },
    component: RemoteComponent
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: '/settings/general'
  }]
}]
