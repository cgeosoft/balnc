import { Injectable } from '@angular/core'
import { ConfigService, Repository, RxDBService } from '@balnc/core'
import { PEvent } from '../models/all'

@Injectable()
export class PEventsRepo extends Repository<PEvent> {

  constructor(
    dbService: RxDBService,
    private config: ConfigService
  ) {
    super(dbService)
    this.entity = 'projects.event'
  }
}
