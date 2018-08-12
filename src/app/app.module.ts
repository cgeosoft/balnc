import { NgModule, APP_INITIALIZER } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ToastrModule } from 'ngx-toastr'

import { AppComponent } from './app.component'
import environment from 'environments/environment'

import { CommonModule, DatabaseService, ConfigService } from '@balnc/common'

import { MainComponent, CoreModule, DashboardRoutes, SettingsRoutes, SetupRoutes, BoxComponent, ErrorRoutes } from '@balnc/core'

import { ContactsRoutes, ContactsEntities, ContactsModule, InvoicesRoutes, InvoicesEntities, InvoicesModule, OrdersRoutes, OrdersModule, OrdersEntities } from '@balnc/business'
import { ProjectsRoutes, ProjectsEntities, ProjectsModule, BoardsRoutes, BoardsEntities, BoardsModule } from '@balnc/teams'
import { PresentationsModule, PresentationsRoutes, PresentationsEntities } from '@balnc/presentations'

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
        ...PresentationsRoutes,
        ...ProjectsRoutes,
        ...BoardsRoutes,
        ...ContactsRoutes,
        ...InvoicesRoutes,
        ...OrdersRoutes,
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
    ProjectsModule,
    PresentationsModule,
    BoardsModule,
    ContactsModule,
    InvoicesModule,
    OrdersModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    ConfigService,
    DatabaseService,
    {
      provide: APP_INITIALIZER,
      deps: [DatabaseService],
      multi: true,
      useFactory: (databaseService: DatabaseService) => async () => {
        await databaseService.setup([
          ...PresentationsEntities,
          ...ProjectsEntities,
          ...BoardsEntities,
          ...ContactsEntities,
          ...InvoicesEntities,
          ...OrdersEntities
        ]).catch(err => {
          sessionStorage.setItem('ngx_error',err.stack)
          if (window.location.href.indexOf('/error') === -1) {
            window.location.href = '/error'
          }
        })
      }
    }
  ]
})
export class AppModule { }
