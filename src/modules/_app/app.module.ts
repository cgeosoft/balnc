import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ServiceWorkerModule } from '@angular/service-worker'
import { RouterModule, PreloadAllModules, Routes } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { MarkdownModule } from 'ngx-md'

import { ENV } from 'environments/environment'

import { CommonModule } from "@blnc/core/common/common.module"
import { DatabaseModule } from '@blnc/core/database/database.module'
import { MainModule } from '@blnc/core/main/main.module'
import { ProfileModule } from '@blnc/core/profile/profile.module'
import { DatabaseService } from '@blnc/core/database/services/database.service';

import { AppComponent } from './app.component'


const AppRoutes: Routes = [{
  path: '',
  component: AppComponent,
  resolve: {
    db: DatabaseService,
  },
  children: [{
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  }],
}]


@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),

    CommonModule,

    ProfileModule,
    MainModule,

    ENV.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],

    DatabaseModule.forRoot(),
    RouterModule.forRoot(AppRoutes, {
      enableTracing: true
      // preloadingStrategy: PreloadAllModules
    }),
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [],
  exports: []
})
export class AppModule { }
