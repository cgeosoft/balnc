import { Entity } from '@balnc/core';

export interface Account extends Entity {
  name: string
  contact?: string
  bank?: string
  paypal?: string
  stripe?: string
}
