import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { RxDBService, CommonService } from '@balnc/common'
import { RxDatabase } from 'rxdb'
import { Observable, Subject } from 'rxjs'

import { OrdersEntities } from './models/_entities'
import { Order } from './models/order'

@Injectable()
export class OrdersService extends CommonService {

  alias = 'Orders'
  entities = OrdersEntities

  async getOrders (params): Promise<Order[]> {
    return super.getAll<Order>('orders', params)
  }

  async getOrder (orderId): Promise<Order> {
    return super.getOne<Order>('orders', orderId)
  }

  async addOrders (order: Order) {
    return super.addOne<Order>('orders', order)
  }
}
