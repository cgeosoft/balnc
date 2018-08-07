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
import { MainComponent, CoreModule, DashboardRoutes, SettingsRoutes, SetupRoutes } from '@balnc/core'
import { PresentationsModule, PresentationsRoutes, PresentationsEntities } from '@balnc/presentations'
import { BoardsRoutes, BoardsEntities, BoardsModule } from '@balnc/boards'
import { ProjectsRoutes, ProjectsEntities, ProjectsModule } from '@balnc/projects'
import { ContactsRoutes, ContactsEntities, ContactsModule } from '@balnc/contacts'
import { InvoicesRoutes, InvoicesEntities, InvoicesModule } from '@balnc/invoices'
// import { OrdersRoutes, OrdersEntities, OrdersModule } from '@balnc/orders'

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
      canActivate: [
        // ConfigGuard,
      ],
      children: [
        ...DashboardRoutes,
        ...SettingsRoutes,
        ...PresentationsRoutes,
        ...ProjectsRoutes,
        ...BoardsRoutes,
        ...ContactsRoutes,
        ...InvoicesRoutes,
        // ...OrdersRoutes,
        {
          path: '',
          pathMatch: 'full',
          redirectTo: '/dashboard'
        }]
    },
      ...SetupRoutes
    ], {
        // enableTracing: true,
    }),
    CommonModule,
    CoreModule,
    ProjectsModule,
    PresentationsModule,
    BoardsModule,
    ContactsModule,
    InvoicesModule
    // OrdersModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    DatabaseService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService, databaseService: DatabaseService) => async () => {
        configService.setup()
        await databaseService.setup([
          ...PresentationsEntities,
          ...ProjectsEntities,
          ...BoardsEntities,
          ...ContactsEntities,
          ...InvoicesEntities
          // ...OrdersEntities
        ])
      },
      deps: [ConfigService, DatabaseService],
      multi: true
    }
  ]
})
export class AppModule { }
