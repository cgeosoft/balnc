import { ErrorHandler, Injectable, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PreloadAllModules, RouterModule } from '@angular/router'
import { CoreModule } from '@balnc/core'
import * as Sentry from '@sentry/browser'
import { Angulartics2Module } from 'angulartics2'
import environment from '../environments/environment'
import { AppComponent } from './app.component'
import { APP_ROUTES } from './app.routes'
import { BusinessDataModule } from './business/business.data.module'
import { MainModule } from './main/main.module'

if (environment.production) {
  Sentry.init({
    release: environment.build.git.hash,
    dsn: 'https://9710c0dc35d14a62a8725d354e9e915e@sentry.io/3249691'
  })
}

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  handleError (error) {
    if (environment.production) {
      const eventId = Sentry.captureException(error.originalError || error)
      Sentry.showReportDialog({ eventId })
      return
    }
    throw error
  }
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MainModule,
    CoreModule,
    Angulartics2Module.forRoot({
      pageTracking: {
        clearIds: true
      }
    }),
    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: PreloadAllModules
      // enableTracing: true
    }),
    BusinessDataModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
