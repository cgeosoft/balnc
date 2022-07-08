import { Entity } from '@balnc/core';

export interface Product extends Entity {
  name: string
  key: string
  attributes: { [key: string]: string | number }[],
  description?: string,
  images: [],
  statement?: string,
  type: 'service' | 'good',
  shippable: boolean
  unitLabel?: string
}

// using _group for product
export interface SKU extends Entity {
  name: string
  key: string
  attributes: { [key: string]: string | number }[],
  description: string,
  images: [],
  currency: string,
  reservation: {
    expression: string
  }
  inventory: {
    quantity: number,
    type: 'finite' | 'bucket' | 'infinite',
    value?: 'in_stock' | 'limited' | 'out_of_stock'
  },
}

export interface InventoryRecord extends Entity {
  amount: number
  description: string
}
