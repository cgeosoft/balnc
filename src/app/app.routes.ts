import { MainComponent, ErrorComponent, BoxComponent } from '@balnc/common'
import { Routes } from '@angular/router'

export const AppRoutes: Routes = [{
  path: '',
  component: MainComponent,
  children: [{
    path: 'dashboard',
    loadChildren: '../packages/dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'settings',
    loadChildren: '../packages/settings/settings.module#SettingsModule'
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  }]
}, {
  path: '',
  component: BoxComponent,
  children: [{
    path: 'setup',
    loadChildren: '../packages/setup/setup.module#SetupModule'
  }, {
    path: 'error',
    component: ErrorComponent
  }]
}]

  // ...BusinessRoutes,
  // ...PresentationsRoutes,
  // ...ProjectsRoutes,
  // ...BoardsRoutes,
  // ...ReportsRoutes,
