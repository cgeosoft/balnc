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

  public orders$: Observable<Order[]>
  public lastAccessed$: Subject<Order[]> = new Subject<Order[]>()

  async getOrders (params): Promise<Order[]> {
    return super.getAll<Order>('orders', params)
  }

  async getOrder (id): Promise<Order> {
    const order = await super.getOne<Order>('orders', id)
    if (!order) return null

    return order
  }

  async addOrders (order: Order) {
    const result = await super.addOne<Order>('orders', order)
    return result
  }
}
