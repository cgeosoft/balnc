import { NgModule, ModuleWithProviders } from '@angular/core';
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
        DatabaseService,
        { provide: 'APP_ENTITIES', useValue: entities }
      ]
    };
  }

  public static forChild(entities: any): ModuleWithProviders {
    return {
      ngModule: DatabaseModule,
      providers: [
        DatabaseService,
        { provide: 'APP_ENTITIES', useValue: entities }
      ]
    };
  }

}
