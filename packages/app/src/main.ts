import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import * as Sentry from '@sentry/browser'
import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

Sentry.init({
  release: `v${environment.version}`,
  environment: environment.production ? 'production' : 'development',
  dsn: environment.sentry.dsn
})

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule, [
  // { defaultEncapsulation: ViewEncapsulation.None }
])
  .catch(err => console.log(err))
