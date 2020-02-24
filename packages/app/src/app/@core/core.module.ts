import { CommonModule } from '@angular/common'
import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core'
import { SharedModule } from '@balnc/shared'
import { DateFnsModule } from 'ngx-date-fns'
import { MarkdownModule, MarkedOptions } from 'ngx-markdown'
import { ToastrModule } from 'ngx-toastr'
import { RxDBService } from './rxdb/rxdb.service'
import { ConfigService } from './services/config.service'
import { UpdateService } from './services/update.service'

export function init (
  configService: ConfigService,
  rxdbService: RxDBService
) {
  return async () => {
    configService.setup()
    await rxdbService.setup()
  }
}
@NgModule({
  imports: [
    CommonModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    DateFnsModule.forRoot(),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: true,
          pedantic: true,
          smartLists: true,
          smartypants: true
        }
      }
    }),
    SharedModule
  ],
  providers: [
    UpdateService,
    ConfigService,
    RxDBService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: init,
      deps: [
        ConfigService,
        RxDBService
      ]
    }
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
