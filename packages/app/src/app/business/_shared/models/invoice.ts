import { RxDocument } from 'rxdb'
import { Entity } from '../../../_core/rxdb/models/entity'

export interface Invoice extends Entity {
  data: {
    serial: string
    from: any
    to: any
    createdAt: string
    updatedAt: string
    issuedAt?: string
    details: InvoiceItem[]
    status: ('pending' | 'issued')
    pdfTemplate?: string
    file?: string
    comment?: string
    transformations: InvoiceTransformation[]
  }
}

export interface InvoiceItem {
  description: string
  amount: number
  price: number
  transformations: InvoiceTransformation[]
}

export interface InvoiceTransformation {
  description: string
  status: ('perc' | 'fix')
  amount: number
}

export interface InvoiceTemplate {
  name: string
  schema: string
}

export type RxInvoiceDoc = RxDocument<Invoice> & Invoice
