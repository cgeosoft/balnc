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
    return {
      ngModule: RxDBModule,
      providers: [
        RxDBService,
        {
          provide: APP_INITIALIZER,
          deps: [RxDBService],
          multi: true,
          useFactory: (srv: RxDBService) => {
            return async () => {
              console.log('Setup RxDBService forRoot')
              await srv.init()
              return srv
            }
          }
        }
      ]
    }
  }
  public static forChild (entities: any): any {
    return {
      ngModule: RxDBModule,
      providers: [
        {
          provide: RxDBService,
          deps: [RxDBService],
          useFactory: async (srv: RxDBService) => {
            return async () => {
              console.log('Setup RxDBService forChild')
              await srv.setup(entities)
              return srv
            }
          }
        }
      ]
    }
  }
}
