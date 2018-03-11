import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'

import { CommonModule } from "@blnc/core/common/common.module"
import { DatabaseModule } from '@blnc/core/database/database.module'
import { ConfigModule } from '@blnc/core/config/config.module'
import { FilesModule } from '@blnc/core/files/files.module'

import { CORE_ROUTES } from './app.routes'
import { AppComponent } from './app.component'

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

    CommonModule,
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
