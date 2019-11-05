import { Entity } from '@balnc/core'

export interface Account extends Entity {
  name: string
  type?: AccountType
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

export const AccountTypeBadges = {
  Cash: { label: 'Cash', color: '#FFAB91' },
  Bank: { label: 'Bank', color: '#9FA8DA' },
  Stripe: { label: 'Stripe', color: '#80DEEA' },
  Paypal: { label: 'Paypal', color: '#81D4FA' }
}
