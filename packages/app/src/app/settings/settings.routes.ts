import { ShellComponent } from './@shell/shell.component'
import { DemoDataComponent } from './demo-data/demo-data.component'
import { DeveloperComponent } from './developer/developer.component'
import { GeneralComponent } from './general/general.component'
import { ModulesComponent } from './modules/modules.component'
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
    path: 'modules',
    data: {
      title: 'Modules'
    },
    component: ModulesComponent
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
