import { Routes } from '@angular/router'
import { MainShellComponent } from './main/@shell/@shell.component'
import { ErrorComponent } from './main/error/error.component'
import { MainGuard } from './main/main.guard'

export const APP_ROUTES: Routes = [{
  path: '',
  component: MainShellComponent,
  canActivate: [MainGuard],
  // resolve: {
  //   MainResolver
  // },
  children: [{
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule'
  }, {
    path: 'support',
    loadChildren: './support/support.module#SupportModule'
  }, {
    path: 'business',
    loadChildren: './business/business.module#BusinessModule'
  }, {
    path: 'documents',
    loadChildren: './documents/documents.module#DocumentsModule'
  }, {
    path: 'projects',
    loadChildren: './projects/projects.module#ProjectsModule'
  }, {
    path: 'presentations',
    loadChildren: './presentations/presentations.module#PresentationsModule'
  }, {
    path: 'boards',
    loadChildren: './boards/boards.module#BoardsModule'
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  }]
}, {
  path: 'setup',
  loadChildren: './setup/setup.module#SetupModule'
}, {
  path: 'error',
  component: ErrorComponent
}]
