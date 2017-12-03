import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { DatabaseModule } from './modules/database/database.module'
import { SettingsModule } from './modules/settings/settings.module'

import { CoreComponent } from './components/core/core.component'
import { MainComponent } from './components/main/main.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'

import { CORE_ROUTES } from './core.routes'
import { Promise, setTimeout } from 'core-js/library/web/timers';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DatabaseModule.forRoot(),
    RouterModule.forRoot(CORE_ROUTES, {
      // enableTracing: true
    })
  ],
  declarations: [
    CoreComponent,
    MainComponent,
    PageNotFoundComponent,
  ],
  bootstrap: [
    CoreComponent
  ],
  providers: [
    {
      provide: 'systemLoaded',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true)

          }, 5000)
        })
      }
    }
  ]
})
export class CoreModule { }
