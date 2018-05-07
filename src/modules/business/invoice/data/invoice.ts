import * as schema from './invoice.json'
import { RxDocument } from 'rxdb';

declare interface IInvoice {
    serial: string
    from: any
    to: any
    createdAt: string
    updatedAt: string
    issuedAt?: string
    details: InvoiceItem[]
    status: ("pending" | "issued")
    pdfTemplate?: string
    file?: string
    comment?: string
    transformations: InvoiceTransformation[]
}

declare interface IInvoiceItem {
    description: string
    amount: number
    price: number
    transformations: InvoiceTransformation[]
}

declare interface IInvoiceTransformation {
    description: string
    status: ("perc" | "fix")
    amount: number
}

declare interface IInvoiceTemplate {
    name: string
    schema: string
}


export type Invoice = IInvoice
export type InvoiceItem = IInvoiceItem
export type InvoiceTransformation = IInvoiceTransformation
export type InvoiceTemplate = IInvoiceTemplate

export type RxInvoiceDoc = RxDocument<IInvoice> & IInvoice

export const InvoiceSchema = schema
