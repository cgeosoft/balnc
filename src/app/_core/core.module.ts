import { NgModule } from '@angular/core';

import { RxDBService } from './rxdb/rxdb.service';
import { CommonService } from './services/common.service';
import { ConfigService } from './services/config.service';

@NgModule({
  providers: [
    RxDBService,
    CommonService,
    ConfigService
  ]
})
export class CoreModule { }
