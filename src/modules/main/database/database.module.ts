import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common'

import { DatabaseService } from './database.service'

@NgModule({
  imports: [],
  declarations: [],
  providers: []
})
export class DatabaseModule {

  public static forRoot(schemas?: any): ModuleWithProviders {
    return {
      ngModule: DatabaseModule,
      providers: [
        DatabaseService,
        { provide: 'APP_SCHEMAS', useValue: schemas }
      ]
    };
  }

  public static forChild(schemas: any): ModuleWithProviders {
    return {
      ngModule: DatabaseModule,
      providers: [
        DatabaseService,
        { provide: 'APP_SCHEMAS', useValue: schemas }
      ]
    };
  }

}
