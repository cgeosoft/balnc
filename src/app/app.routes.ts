import { MainComponent, ErrorComponent, BoxComponent } from '@balnc/common'
import { Routes } from '@angular/router'

export const AppRoutes: Routes = [{
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
  path: '',
  component: BoxComponent,
  children: [{
    path: 'setup',
    loadChildren: '../modules/setup/setup.module#SetupModule'
  }, {
    path: 'error',
    component: ErrorComponent
  }]
}]
