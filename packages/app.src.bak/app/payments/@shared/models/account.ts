import { Entity } from '@balnc/core'

export interface Account extends Entity {
  name: string
  atype?: AccountType
  contact?: string
  bank?: string
  paypal?: string
  stripe?: string
}

export enum AccountType {
  Cash,
  Bank,
  Stripe,
  Paypal
}

export const AccountTypeBadges = [
  { ey: 'cash', label: 'Cash', color: '#FFAB91' },
  { ey: 'bank', label: 'Bank', color: '#9FA8DA' },
  { ey: 'stripe', label: 'Stripe', color: '#80DEEA' },
  { ey: 'paypal', label: 'Paypal', color: '#81D4FA' }
]
