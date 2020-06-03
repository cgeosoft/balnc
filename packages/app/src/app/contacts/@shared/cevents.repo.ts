import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { CEvent } from './contacts'

@Injectable({
  providedIn: 'root'
})
export class CEventsRepo extends Repository<CEvent> {
  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'contacts.event'
  }

}
