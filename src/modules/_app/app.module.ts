import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule, Routes } from '@angular/router'

import { CommonModule } from "@blnc/core/common/common.module"
import { DatabaseModule } from '@blnc/core/database/database.module'
import { ConfigModule } from '@blnc/core/config/config.module'
import { FilesModule } from '@blnc/core/files/files.module'
import { MainModule } from '@blnc/core/main/main.module'

import { AppComponent } from './app.component'
import { PageNotFoundComponent } from '@blnc/core/common/components/page-not-found/page-not-found.component'
import { MainComponent } from '@blnc/core/main/main.component'
import { DatabaseService } from '@blnc/core/database/services/database.service'
import { AccountsModule } from '@blnc/general/accounts/accounts.module'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([], {
      enableTracing: true
    }),
    NgbModule.forRoot(),
    DatabaseModule.forRoot(),

    CommonModule,
    FilesModule,
    ConfigModule,

    MainModule,
    AccountsModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [],
  exports: [
    RouterModule,
  ]
})
export class AppModule { }
