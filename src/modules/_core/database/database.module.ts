import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http';

import { DatabaseService } from './database.service'
import { Entity } from './models/entity';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [],
  providers: []
})
export class DatabaseModule {

  public static forRoot(entities?: Entity[]): ModuleWithProviders {
    return {
      ngModule: DatabaseModule,
      providers: [
        DatabaseService,
        { provide: 'APP_ENTITIES', useValue: entities }
      ]
    }
  }

  public static forChild(entities: Entity[]): ModuleWithProviders {
    return {
      ngModule: DatabaseModule,
      providers: [
        DatabaseService,
        { provide: 'APP_ENTITIES', useValue: entities }
      ]
    }
  }

}
