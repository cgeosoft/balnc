import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { Slide } from '../models/slide'

@Injectable()
export class SlidesRepo extends Repository<Slide> {
  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'presentations.slides'
  }
}
