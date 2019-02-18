import { Routes } from '@angular/router'
import { MainComponent, ErrorComponent } from '@balnc/shared';

export const APP_ROUTES: Routes = [{
  path: '',
  component: MainComponent,
  children: [{
    path: 'dashboard',
    loadChildren: '../dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'settings',
    loadChildren: '../settings/settings.module#SettingsModule'
  }, {
    path: 'business',
    loadChildren: '../business/business.module#BusinessModule'
  }, {
    path: 'projects',
    loadChildren: '../projects/projects.module#ProjectsModule'
  }, {
    path: 'presentations',
    loadChildren: '../presentations/presentations.module#PresentationsModule'
  }, {
    path: 'boards',
    loadChildren: '../boards/boards.module#BoardsModule'
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  }]
}, {
  path: 'setup',
  loadChildren: '../setup/setup.module#SetupModule'
}, {
  path: 'error',
  component: ErrorComponent
}]