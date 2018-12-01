import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { ServiceWorkerModule } from '@angular/service-worker'
import { BoardsModule } from '@balnc/boards'
import { BusinessModule } from '@balnc/business'
import { CommonModule, ConfigService } from '@balnc/common'
import { PresentationsModule } from '@balnc/presentations'
import { ProjectsModule } from '@balnc/projects'
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
      // enableTracing: true,
    }),

    // BusinessModule,
    // ProjectsModule,
    // BoardsModule,
    // PresentationsModule
    // ReportsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [ConfigService]
})
export class AppModule { }
