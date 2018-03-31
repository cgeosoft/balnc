import * as schema from './contact.json'
import { RxDocument } from 'rxdb';

declare interface RxContactDocumentType {
    name?: string
    address?: string
    email?: string
    phone?: string
    details?: any
    subContacts?: any[]
}

export type RxContactDocument = RxDocument<RxContactDocumentType> & RxContactDocumentType
export const ContactSchema = schema
