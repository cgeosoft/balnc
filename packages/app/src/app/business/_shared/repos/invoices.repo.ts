import { Injectable } from '@angular/core'
import { RxDBService } from '@balnc/core'
import { Repository } from '@balnc/shared'
import { Invoice } from '../models/invoice'

@Injectable()
export class InvoicesRepo extends Repository<Invoice> {

  constructor(
    dbService: RxDBService
  ) {
    super(dbService)
    this.entity = 'invoice'
  }

}
