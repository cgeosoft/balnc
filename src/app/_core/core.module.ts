import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ServiceWorkerModule } from '@angular/service-worker'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ToastrModule } from 'ngx-toastr'
import environment from 'src/environments/environment.prod'

import { CORE_ROUTES } from './core.routes'
import { RxDBService } from './rxdb/rxdb.service'
import { CommonService } from './services/common.service'
import { ConfigService } from './services/config.service'

@NgModule({
  imports: [
    NgbModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
    RouterModule.forRoot(CORE_ROUTES, {
      // enableTracing: true
    })
  ],
  providers: [
    RxDBService,
    CommonService,
    ConfigService
  ]
})
export class CoreModule { }
