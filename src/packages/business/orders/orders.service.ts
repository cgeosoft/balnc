import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { RxDBService } from '@balnc/common'
import { RxDatabase } from 'rxdb'
import { Observable, Subject } from 'rxjs'

import { OrdersEntities } from './models/_entities'
import { Order } from './models/order'

@Injectable()
export class OrdersService implements Resolve<any> {

  db: RxDatabase

  public orders$: Observable<Order[]>
  public lastAccessed$: Subject<Order[]> = new Subject<Order[]>()

  constructor (
    private dbService: RxDBService
  ) {
  }

  async resolve () {
    if (!this.db) {
      console.log('Setup orders db')
      this.db = await this.dbService.setup(OrdersEntities)
      this.orders$ = this.db['orders'].find().$
      console.log('...Setuped orders db')
    }

    this.orders$
      .subscribe(orders => {
        this.lastAccessed$.next(orders.slice(0, 10))
      })
  }

  async getOrders (params): Promise<Order[]> {
    return this.db['orders'].find(params).exec()
  }

  async getOrder (id): Promise<Order> {
    const order = await this.db['orders'].findOne(id).exec()
    if (!order) return null

    return order
  }

  async addOrders (order: Order) {
    const result = await this.db['orders']
      .newDocument(order)
      .save()
    return result
  }

}
