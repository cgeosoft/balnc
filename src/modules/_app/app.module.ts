import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule, PreloadAllModules } from '@angular/router'

import { CommonModule } from "@blnc/core/common/common.module"
import { DatabaseModule } from '@blnc/core/database/database.module'
import { MainModule } from '@blnc/core/main/main.module'
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-md';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ENV } from 'environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),

    CommonModule,
    MainModule,
    ENV.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],

    DatabaseModule.forRoot(),
    RouterModule.forRoot([], {
      // enableTracing: true
      preloadingStrategy: PreloadAllModules
    }),
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
