import { Injectable } from '@angular/core'
import { Repository, RxDBService } from '@balnc/core'
import { CEvent } from '../models/contacts'

@Injectable()
export class CEventsRepo extends Repository<CEvent> {
  constructor (
    dbService: RxDBService
  ) {
    super(dbService)
    this.entity = 'business.event'
  }
}
