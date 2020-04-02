import { Entity } from '@balnc/core'

export interface Transaction extends Entity {
  from?: string
  to?: string
  amount: number
  executed?: number
  planned?: number
  aggreement?: string
  invoice?: string
}
