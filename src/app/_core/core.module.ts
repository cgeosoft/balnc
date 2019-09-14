import { CommonModule } from '@angular/common'
import { NgModule, Optional, SkipSelf } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { DateFnsModule } from 'ngx-date-fns'
import { MarkdownModule, MarkedOptions } from 'ngx-markdown'
import { ToastrModule } from 'ngx-toastr'
import { APP_ROUTES, ProfileGuardService } from './app.routes'
import { ErrorComponent } from './components/error/error.component'
import { MainShellComponent } from './components/main-shell/main-shell.component'
import { RxDBService } from './rxdb/rxdb.service'
import { ConfigService } from './services/config.service'

@NgModule({
  imports: [
    CommonModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    DateFnsModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES, {
      // enableTracing: true
    }),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: true,
          sanitize: true,
          smartLists: true,
          smartypants: true
        }
      }
    }),
    SharedModule
  ],
  declarations: [
    MainShellComponent,
    ErrorComponent
  ],
  providers: [
    RxDBService,
    ConfigService,
    ProfileGuardService
  ],
  exports: [
    RouterModule
  ]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule')
    }
  }
}
