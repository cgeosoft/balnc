import { NgModule, APP_INITIALIZER } from '@angular/core'
import { RouterModule } from '@angular/router'

import { ContactsModule, ContactsEntities } from './contacts'
import { InvoicesModule, InvoicesEntities } from './invoices'
import { OrdersModule, OrdersEntities } from './orders'
import { PouchDBService, CommonModule } from '@balnc/common'

@NgModule({
  imports: [
    CommonModule,
    ContactsModule,
    InvoicesModule,
    OrdersModule,
    RouterModule
  ],
  declarations: [],
  providers: [
    PouchDBService,
    {
      provide: APP_INITIALIZER,
      deps: [PouchDBService],
      multi: true,
      useFactory: (db: PouchDBService) => async () => {
        await db.setup('business', [
          ...ContactsEntities,
          ...InvoicesEntities,
          ...OrdersEntities
        ]).catch(err => {
          sessionStorage.setItem('ngx_error', err.stack)
          if (window.location.href.indexOf('/error') === -1) {
            window.location.href = '/error'
          }
        })
      }
    }
  ],
  entryComponents: []
})
export class BusinessModule { }
