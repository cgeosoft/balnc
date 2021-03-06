import { Entity } from '@balnc/core'
import { RxDocument } from 'rxdb'

export enum TransformationMethod {
  percent,
  exact
}

export interface Transformation {
  description: string
  method: TransformationMethod
  amount: number
}

export interface OrderItem {
  transformations?: Transformation[]
  ammount: number
  price: number
  description: string
}

export interface Order extends Entity {
  serial: string
  customer?: string
  executedAt?: number
  crontab?: string
  status?: string
  currency?: string
  comment?: string
  transformations?: Transformation[]
  items?: OrderItem[]
}

export type RxOrderDocument = RxDocument<Order> & Order
