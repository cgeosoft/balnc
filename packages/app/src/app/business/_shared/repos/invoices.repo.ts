import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { Invoice } from '../models/invoice'

@Injectable()
export class InvoicesRepo extends Repository<Invoice> {

  constructor(
    injector: Injector
  ) {
    super(injector)
    this.entity = 'business.invoice'
  }

}
