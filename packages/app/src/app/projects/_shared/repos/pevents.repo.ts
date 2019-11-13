import { Injectable } from '@angular/core'
import { Repository, RxDBService } from '@balnc/core'
import { PEvent } from '../models/all'

@Injectable()
export class PEventsRepo extends Repository<PEvent> {

  constructor (
    dbService: RxDBService
  ) {
    super(dbService)
    this.entity = 'projects.event'
  }
}
