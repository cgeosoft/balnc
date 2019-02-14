import { Routes } from '@angular/router'
import { MainComponent, ErrorComponent } from '../_shared'

export const CORE_ROUTES: Routes = [{
  path: '',
  component: MainComponent,
  children: [{
    path: 'dashboard',
    loadChildren: '../modules/dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'settings',
    loadChildren: '../modules/settings/settings.module#SettingsModule'
  }, {
    path: 'business',
    loadChildren: '../modules/business/business.module#BusinessModule'
  }, {
    path: 'projects',
    loadChildren: '../modules/projects/projects.module#ProjectsModule'
  }, {
    path: 'presentations',
    loadChildren: '../modules/presentations/presentations.module#PresentationsModule'
  }, {
    path: 'boards',
    loadChildren: '../modules/boards/boards.module#BoardsModule'
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  }]
}, {
  path: 'setup',
  loadChildren: '../modules/setup/setup.module#SetupModule'
}, {
  path: 'error',
  component: ErrorComponent
}]
