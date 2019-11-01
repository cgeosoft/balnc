import { Injectable } from '@angular/core'
import { Repository, RxDBService } from '@balnc/core'
import { Presentation } from '../models/presentation'

@Injectable()
export class PresentationsRepo extends Repository<Presentation> {

  constructor (
    dbService: RxDBService
  ) {
    super(dbService)
    this.entity = 'presentations.presentation'
  }
}
