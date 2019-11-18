import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { Page } from '../models/page'

@Injectable()
export class PagesRepo extends Repository<Page> {
  constructor(
    injector: Injector
  ) {
    super(injector)
    this.entity = 'presentations.page'
  }
}
