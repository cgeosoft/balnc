import { RxDocument } from 'rxdb'

export interface Order {
  serial?: string
  customer?: string
  dateExecute?: string
  crontab?: string
  status?: string
  currency?: string
  comment?: string
  transformations?: string
}

export type RxOrderDocument = RxDocument<Order> & Order
