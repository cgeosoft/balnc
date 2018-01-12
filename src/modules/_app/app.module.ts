import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'

import { CORE_ROUTES } from './app.routes'
import { AppComponent } from './app.component'

import { BlcCommonModule } from "../_core/common/common.module"
import { DatabaseModule } from '../_core/database/database.module'
import { ConfigModule } from '../_core/config/config.module'
import { FilesModule } from '../_core/files/files.module'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(CORE_ROUTES, {
      // enableTracing: true
    }),
    NgbModule.forRoot(),

    DatabaseModule.forRoot(),
    FilesModule,
    ConfigModule,

    BlcCommonModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
