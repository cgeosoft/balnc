import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { DatabaseService } from './database.service'

@NgModule({
  imports: [
  ],
  declarations: [
    DatabaseService
  ],
  providers: [
    DatabaseService
  ]
})
export class DatabaseModule {

  static forChild(schemas: any) {
    return {
      ngModule: DatabaseModule,
      providers: [
        schemas
      ]
    };
  }

}
