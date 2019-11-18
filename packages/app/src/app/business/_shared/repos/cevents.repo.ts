import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { CEvent } from '../models/contacts'

@Injectable()
export class CEventsRepo extends Repository<CEvent> {

  constructor(
    injector: Injector
  ) {
    super(injector)
    this.entity = 'business.event'
  }

}
