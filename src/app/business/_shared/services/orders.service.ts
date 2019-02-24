import { Injectable } from '@angular/core';
import { RxDBService } from '@balnc/core';
import { CommonService } from '@balnc/shared';
import { Order } from '../models/order';
import { OrdersEntities } from '../models/_entities';

@Injectable()
export class OrdersService extends CommonService {

  alias = 'Orders'
  entities = OrdersEntities

  constructor (
    dbService: RxDBService
  ) {
    super({
      alias: 'orders',
      entities: [],
      dbService
    })
  }

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
