import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { PEvent } from '../models/all'

@Injectable({
  providedIn: 'root'
})
export class PEventsRepo extends Repository<PEvent> {
  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'projects.event'
  }
}
