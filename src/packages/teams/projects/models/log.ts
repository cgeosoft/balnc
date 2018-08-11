import * as schema from './log.json'
import { RxDocument } from 'rxdb'

declare interface ILog {
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

export type Log = ILog
export type RxLogDoc = RxDocument<ILog> & ILog
export const LogSchema = schema
