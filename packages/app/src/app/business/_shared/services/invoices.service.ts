import { Injectable } from '@angular/core'
import { RxDBService } from '@balnc/core'
import { CommonService } from '@balnc/shared'
import { Invoice } from '../models/invoice'

@Injectable()
export class InvoicesService extends CommonService<Invoice> {

  constructor(
    dbService: RxDBService
  ) {
    super(dbService)
    this.type = 'invoice'
  }

}
