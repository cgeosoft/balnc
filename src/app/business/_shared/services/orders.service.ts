import { Injectable, NgZone } from '@angular/core'
import { RxDBService } from '@balnc/core'
import { CommonService } from '@balnc/shared'
import { Order } from '../models/order'
import { OrdersEntities } from '../models/_entities'

@Injectable()
export class OrdersService extends CommonService {

  constructor (
    zone: NgZone,
    dbService: RxDBService
  ) {
    super(zone, dbService)
  }

  async setup () {
    await super.setup({
      alias: 'orders',
      entities: OrdersEntities
    })
  }

  async getOrders (params): Promise<Order[]> {
    return super.getAll<Order>('orders', params)
  }

  async getOrder (orderId): Promise<Order> {
    return super.getOne<Order>('orders', orderId)
  }

  async addOrder (order: Order) {
    return super.addOne<Order>('orders', order)
  }
}
