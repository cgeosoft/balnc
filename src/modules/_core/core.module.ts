import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'

import { DatabaseModule } from './modules/database/database.module'
import { SettingsModule } from './modules/settings/settings.module'

import { CoreComponent } from './components/core/core.component'
import { MainComponent } from './components/main/main.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'

import { CORE_ROUTES } from './core.routes'

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
  bootstrap: [CoreComponent]
})
export class CoreModule { }
