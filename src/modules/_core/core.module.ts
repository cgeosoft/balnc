import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { DatabaseModule } from './modules/database/database.module'
import { SettingsModule } from './modules/settings/settings.module'

import { CoreComponent, MainComponent, PageNotFoundComponent } from './components'

import { CORE_ROUTES } from './core.routes'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DatabaseModule.forRoot(),
    RouterModule.forRoot(CORE_ROUTES, {
      // enableTracing: true
    }),
    NgbModule.forRoot()
  ],
  declarations: [
    CoreComponent,
    MainComponent,
    PageNotFoundComponent,
  ],
  bootstrap: [
    CoreComponent
  ],
  providers: []
})
export class CoreModule { }
