import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import * as Sentry from '@sentry/browser'
import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

Sentry.init({
  release: `${environment.version}-${environment.build.git.hash}`,
  dsn: 'https://9710c0dc35d14a62a8725d354e9e915e@sentry.io/3249691',
})

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err))
