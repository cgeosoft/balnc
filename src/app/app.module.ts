import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ToastrModule } from 'ngx-toastr'

import { AppComponent } from './app.component'
import environment from 'environments/environment'

import { CommonModule, ConfigService } from '@balnc/common'

import { MainComponent, CoreModule, DashboardRoutes, SettingsRoutes, SetupRoutes, BoxComponent, ErrorRoutes } from '@balnc/core'

import { BusinessModule, BusinessRoutes } from '@balnc/business'
import { ProjectsModule, ProjectsRoutes } from '@balnc/projects'
import { BoardsModule, BoardsRoutes } from '@balnc/boards'
import { PresentationsModule, PresentationsRoutes } from '@balnc/presentations'

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
    RouterModule.forRoot([{
      path: '',
      component: MainComponent,
      children: [

        ...DashboardRoutes,
        ...SettingsRoutes,

        ...BusinessRoutes,
        ...PresentationsRoutes,
        ...ProjectsRoutes,
        ...BoardsRoutes,

        {
          path: '',
          pathMatch: 'full',
          redirectTo: '/dashboard'
        }]
    }, {
      path: '',
      component: BoxComponent,
      children: [
        ...SetupRoutes,
        ...ErrorRoutes
      ]
    }], {
        // enableTracing: true,
    }),
    CommonModule,

    CoreModule,

    BusinessModule,
    ProjectsModule,
    BoardsModule,
    PresentationsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [ConfigService]
})
export class AppModule { }
