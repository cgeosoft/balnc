import { Injectable } from '@angular/core'
import { Repository, RxDBService } from '@balnc/core'
import { Invoice } from '../models/invoice'

@Injectable()
export class InvoicesRepo extends Repository<Invoice> {

  constructor (
    dbService: RxDBService
  ) {
    super(dbService)
    this.entity = 'business.invoice'
  }

}
