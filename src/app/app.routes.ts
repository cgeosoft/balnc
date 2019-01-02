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
    path: 'business',
    loadChildren: '../packages/business/business.module#BusinessModule'
  }, {
    path: 'projects',
    loadChildren: '../packages/projects/projects.module#ProjectsModule'
  }, {
    path: 'presentations',
    loadChildren: '../packages/presentations/presentations.module#PresentationsModule'
  }, {
    path: 'boards',
    loadChildren: '../packages/boards/boards.module#BoardsModule'
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
