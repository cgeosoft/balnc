import * as schema from './contact.json'

declare interface RxContactDocumentType {
    orders: Array<string>
    dateCreated: string
    dateUpdated: string
    dateIssued?: string
    status: ("pending" | "issued")
    file?: string
    comment?: string
}

export type RxContactDocument = RxContactDocumentType
export const ContactSchema = schema
