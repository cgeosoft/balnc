import { NgModule, APP_INITIALIZER } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ServiceWorkerModule } from '@angular/service-worker'
import { RouterModule, PreloadAllModules, Routes } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { MarkdownModule } from 'ngx-md'

import { ENV } from 'environments/environment'

import { CommonModule } from "@blnc/core/common/common.module"
import { MainModule } from '@blnc/core/main/main.module'
import { ProfileModule } from '@blnc/core/profile/profile.module'

import { AppComponent } from './app.component'
import { MainComponent } from '@blnc/core/main/main.component';
import { DefaultProfileGuard } from '@blnc/core/profile/guards/profile.guard';
import { ManageComponent } from '@blnc/core/profile/components/manage/manage.component';

const AppRoutes: Routes = [{
  path: '',
  component: AppComponent,
  children: [{
    path: '',
    component: MainComponent,
    canActivate: [DefaultProfileGuard],
  }, {
    path: 'manage',
    component: ManageComponent,
  }]
}]

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ENV.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],

    RouterModule.forRoot(AppRoutes, {
      // enableTracing: true
      // preloadingStrategy: PreloadAllModules
    }),

    CommonModule,
    ProfileModule,
    MainModule,
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
