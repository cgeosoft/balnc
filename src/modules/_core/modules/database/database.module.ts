import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

import { DatabaseService } from './database.service'

@NgModule({
  imports: [],
  declarations: [],
  providers: []
})
export class DatabaseModule {

  public static forRoot(entities?: any): ModuleWithProviders {
    return {
      ngModule: DatabaseModule,
      providers: [
        DatabaseService
      ]
    }
  }

  public static forChild(entities: any): ModuleWithProviders {
    return {
      ngModule: DatabaseModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: (databaseService: DatabaseService) => () => {
            return databaseService.setup(entities)
          },
          deps: [DatabaseService],
          multi: true
        },
      ]
    }
  }

}
