import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core'

import { CommonModule } from '@balnc/common'

import { RxDBService } from './rxdb.service'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [],
  entryComponents: []
})
export class RxDBModule {
  public static forRoot (): ModuleWithProviders {
    console.log('Setup RxDBService forRoot')
    return {
      ngModule: RxDBModule,
      providers: [
        {
          provide: RxDBService,
          deps: [RxDBService],
          useFactory: (srv: RxDBService) => {
            return async () => {
              console.log('Setup RxDBService forRoot')
              await srv.init()
            }
          }
        }
      ]
    }
  }
  public static forChild (entities: any): ModuleWithProviders {
    console.log('Setup RxDBService forChild entities', entities)
    return {
      ngModule: RxDBModule,
      providers: [
        {
          provide: RxDBService,
          deps: [RxDBService],
          useFactory: (srv: RxDBService) => {
            return () => {
              console.log('Setup RxDBService forChild')

              for (const entity of entities) {
                srv.entities.push(entity)
              }

            }
          }
        }
      ]
    }
  }
}
