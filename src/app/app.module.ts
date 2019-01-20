import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { ServiceWorkerModule } from '@angular/service-worker'
import { CommonModule, ConfigService } from '@balnc/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import environment from 'environments/environment'
import { ToastrModule } from 'ngx-toastr'

import { AppComponent } from './app.component'
import { AppRoutes } from './app.routes'

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
    CommonModule,
    RouterModule.forRoot(AppRoutes, {
      // enableTracing: true
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    ConfigService
  ]
})
export class AppModule { }
