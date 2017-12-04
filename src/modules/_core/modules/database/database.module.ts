import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

import { DatabaseService } from './database.service'
import { Entity } from './models/entity';

@NgModule({
  imports: [],
  declarations: [],
  providers: []
})
export class DatabaseModule {

  public static forRoot(entities?: Entity[]): ModuleWithProviders {
    console.log("forRoot", entities)
    return {
      ngModule: DatabaseModule,
      providers: [
        DatabaseService,
        { provide: 'APP_ENTITIES', useValue: entities }
      ]
    }
  }

  public static forChild(entities: Entity[]): ModuleWithProviders {
    console.log("forChild", entities)
    return {
      ngModule: DatabaseModule,
      providers: [
        DatabaseService,
        { provide: 'APP_ENTITIES', useValue: entities }
      ]
    }
  }

}
