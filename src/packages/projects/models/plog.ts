import { RxDocument } from 'rxdb'

declare interface IPLog {
  title?: string
  description?: string

  project: string
  type: string
  status: string
  parent?: string
  labels?: string[]

  insertedAt: string
  insertedFrom: string
  updatedAt?: string
  updatedFrom?: string
}

export type PLog = IPLog
export type RxPLogDoc = RxDocument<IPLog> & IPLog
