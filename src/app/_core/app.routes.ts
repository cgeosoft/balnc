// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core'
import { CanActivate, Router, Routes } from '@angular/router'
import { ErrorComponent } from './components/error/error.component'
import { MainShellComponent } from './components/main-shell/main-shell.component'
import { ConfigService } from './services/config.service'

@Injectable()
export class ProfileGuardService implements CanActivate {
  constructor (public config: ConfigService, public router: Router) { }
  async canActivate () {
    this.config.setup()
    return !!this.config.profile
  }
}

export const APP_ROUTES: Routes = [{
  path: '',
  component: MainShellComponent,
  canActivate: [ProfileGuardService],
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
    path: 'documents',
    loadChildren: '../documents/documents.module#DocumentsModule'
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
