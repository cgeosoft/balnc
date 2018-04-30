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
import { DatabaseService } from '@blnc/core/common/services/database.service';
import { ProfileService } from '@blnc/core/profile/services/profile.service';
import { ConfigService } from '@blnc/core/common/services/config.service';
import { WelcomeGuard } from '@blnc/core/welcome/welcome.guard';
import { WelcomeModule } from '@blnc/core/welcome/welcome.module';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ENV.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],

    RouterModule.forRoot([], {
      // enableTracing: true
      // preloadingStrategy: PreloadAllModules
    }),

    CommonModule,
    MainModule,
    ProfileModule,
    WelcomeModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    DatabaseService,
    ProfileService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (databaseService: DatabaseService, profileService: ProfileService, configService: ConfigService) => async () => {
        configService.setup()
        profileService.setup()
        const profile = profileService.get()
        if (profile) {
          configService.profile = profile
          await databaseService.setup(profile)
        }
      },
      deps: [DatabaseService, ProfileService, ConfigService],
      multi: true,
    }],
  exports: []
})
export class AppModule { }
