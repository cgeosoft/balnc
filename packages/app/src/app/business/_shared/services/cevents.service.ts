import { Injectable } from '@angular/core'
import { RxDBService } from '@balnc/core'
import { CommonService } from '@balnc/shared'
import { CEvent } from '../models/contacts'

@Injectable()
export class CEventsService extends CommonService<CEvent> {
  constructor(
    dbService: RxDBService
  ) {
    super(dbService)
    this.type = 'cevent'
  }
}
