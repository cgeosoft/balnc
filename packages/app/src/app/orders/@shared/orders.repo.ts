import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { Order } from './order'

@Injectable({
  providedIn: 'root'
})
export class OrdersRepo extends Repository<Order> {
  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'order'
  }
}
