import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'

import { CommonModule } from "@blnc/core/common/common.module"
import { DatabaseModule } from '@blnc/core/database/database.module'
import { ConfigModule } from '@blnc/core/config/config.module'
import { FilesModule } from '@blnc/core/files/files.module'
import { MainModule } from '@blnc/core/main/main.module'
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-md';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    DatabaseModule.forRoot(),
    RouterModule.forRoot([], {
      // enableTracing: true
    }),
    CommonModule,
    FilesModule,
    ConfigModule,

    MainModule,

    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : []
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
