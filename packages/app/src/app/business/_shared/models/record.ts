import { Entity } from '@balnc/core'

export interface Record extends Entity {
  transaction: string
  account: string
  amount: number
}
