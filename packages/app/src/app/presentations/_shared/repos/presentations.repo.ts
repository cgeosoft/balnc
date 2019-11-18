import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { Presentation } from '../models/presentation'

@Injectable()
export class PresentationsRepo extends Repository<Presentation> {
  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'presentations.presentation'
  }
}
