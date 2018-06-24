import { NgModule, APP_INITIALIZER } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ToastrModule } from 'ngx-toastr'

import { CommonModule, DatabaseService, ConfigService } from '@balnc/common'
import { CoreModule, ProfileService, MainComponent } from '@balnc/core'

import { AppComponent } from './app.component';
import ENV from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    // ENV.isProd ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    ToastrModule.forRoot({
      positionClass: "toast-bottom-center"
    }),
    RouterModule.forRoot([{
      path: '',
      component: MainComponent,
      // canActivate: [
      //   WelcomeGuard,
      //   DefaultProfileGuard,
      // ],
      children: [{
      //   path: 'dashboard',
      //   loadChildren: "@balnc/core/dashboard.module#DashboardModule",
      // }, {
      //   path: 'business',
      //   loadChildren: "@balnc/business/business.module#BusinessModule",
      // }, {
      //   path: 'teams',
      //   loadChildren: "@balnc/teams/teams.module#TeamsModule",
      // }, {
      //   path: 'marketing',
      //   loadChildren: "@balnc/marketing/marketing.module#MarketingModule",
      // }, {
      //   path: 'report',
      //   loadChildren: "@balnc/report/report.module#ReportModule",
      // }, {
        path: '',
        pathMatch: "full",
        redirectTo: "/dashboard"
      }],
    }], {
        // enableTracing: true,
        // preloadingStrategy: PreloadAllModules,
      }),
    CommonModule,
    CoreModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    DatabaseService,
    ConfigService,
    ProfileService,
    {
      provide: APP_INITIALIZER,
      useFactory: (databaseService: DatabaseService, profileService: ProfileService, configService: ConfigService) => async () => {
        configService.setup(ENV)
        profileService.setup()
        const profile = profileService.getCurrent()
        if (profile) {
          configService.profile = profile
          await databaseService.setup(profile)
        }
      },
      deps: [DatabaseService, ProfileService, ConfigService],
      multi: true,
    }
  ],
})
export class AppModule { }
