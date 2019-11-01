import { Injectable } from '@angular/core'
import { Repository, RxDBService } from '@balnc/core'
import { Page } from '../models/page'

@Injectable()
export class PagesRepo extends Repository<Page> {
  constructor(
    dbService: RxDBService
  ) {
    super(dbService)
    this.entity = 'presentations.page'
  }
}
