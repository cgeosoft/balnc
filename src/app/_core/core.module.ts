import { NgModule } from '@angular/core';
import { RxDBService } from './rxdb/rxdb.service';
import { ConfigService } from './services/config.service';

@NgModule({
  providers: [
    RxDBService,
    ConfigService
  ]
})
export class CoreModule { }
