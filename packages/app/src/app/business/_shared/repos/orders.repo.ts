import { Injectable } from '@angular/core'
import { Repository, RxDBService } from '@balnc/core'
import { Order } from '../models/order'

@Injectable()
export class OrdersRepo extends Repository<Order> {

  constructor(
    dbService: RxDBService
  ) {
    super(dbService)
    this.entity = 'order'
  }
}
