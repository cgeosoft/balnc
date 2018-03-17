import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule, PreloadAllModules } from '@angular/router'

import { CommonModule } from "@blnc/core/common/common.module"
import { DatabaseModule } from '@blnc/core/database/database.module'
import { ConfigModule } from '@blnc/core/config/config.module'
import { FilesModule } from '@blnc/core/files/files.module'
import { MainModule } from '@blnc/core/main/main.module'
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-md';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    DatabaseModule.forRoot(),
    RouterModule.forRoot([], {
      // enableTracing: true
      preloadingStrategy: PreloadAllModules
    }),
    CommonModule,
    FilesModule,
    ConfigModule,

    MainModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [],
  exports: []
})
export class AppModule { }
