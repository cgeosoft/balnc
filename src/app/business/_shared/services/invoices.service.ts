import { Injectable, NgZone } from '@angular/core'
import { RxDBService } from '@balnc/core'
import { CommonService } from '@balnc/shared'
import { InvoicesEntities } from '../models/_entities'

@Injectable()
export class InvoicesService extends CommonService {

  constructor (
    zone: NgZone,
    dbService: RxDBService
  ) {
    super(zone, dbService)
  }

  async setup () {
    await super.setup({
      alias: 'invoices',
      entities: InvoicesEntities
    })
  }

}
