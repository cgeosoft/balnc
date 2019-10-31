import { Injectable } from '@angular/core'
import { RxDBService } from '@balnc/core'
import { Repository } from '@balnc/shared'
import { CEvent } from '../models/contacts'

@Injectable()
export class CEventsRepo extends Repository<CEvent> {
  constructor(
    dbService: RxDBService
  ) {
    super(dbService)
    this.entity = 'cevent'
  }
}
