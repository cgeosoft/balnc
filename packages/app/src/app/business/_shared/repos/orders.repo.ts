import { Injectable } from '@angular/core'
import { RxDBService } from '@balnc/core'
import { Repository } from '@balnc/shared'
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
