declare interface RxInvoiceDocumentType {
    orders: Array<string>
    dateCreated: string
    dateUpdated: string
    dateIssued?: string
    status: ("pending" | "issued")
    file?: string
    comment?: string
}

export type RxInvoiceDocument = RxInvoiceDocumentType

export const InvoiceSchema = require('../../../../../schemas/business/invoices/invoice.json')
