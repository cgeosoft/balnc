import { RxDocument, RxCollection, RxDatabase } from 'rxdb'

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

declare class RxInvoiceCollection extends RxCollection<RxInvoiceDocumentType> {
}

export class RxInvoicesDatabase extends RxDatabase {
    invoice?: RxInvoiceCollection
}

export default {
    RxInvoiceCollection,
    RxInvoicesDatabase
}