import { NgModule, APP_INITIALIZER } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker'
import { RouterModule, PreloadAllModules } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ToastrModule } from 'ngx-toastr'

import { AppComponent } from './app.component';
import ENV from '../environments/environment';

import { CommonModule, DatabaseService, ConfigService, ConfigGuard } from '@balnc/common'
import { MainComponent, CoreModule, SetupComponent, DashboardRoutes, SettingsRoutes } from '@balnc/core'
import { PresentationsModule, PresentationsRoutes } from '@balnc/marketing'

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
      canActivate: [
        // ConfigGuard,
      ],
      children: [
        ...DashboardRoutes,
        ...SettingsRoutes,
        {
          path: '',
          children: PresentationsRoutes,
        }
      ],
    }, {
      path: 'setup',
      component: SetupComponent,
    }, {
      path: '',
      pathMatch: "full",
      redirectTo: "/dashboard"
    }], {
        // enableTracing: true,
      }),
    CommonModule,
    CoreModule,
    PresentationsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    DatabaseService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => async () => {
        configService.setup(ENV)
      },
      deps: [ConfigService],
      multi: true,
    }
  ],
})
export class AppModule { }
