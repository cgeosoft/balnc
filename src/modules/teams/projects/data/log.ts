import * as schema from './log.json'
import { RxDocument } from 'rxdb';

declare interface RxLogDocumentType {
    title?: string
    description?: string

    project: string
    type: string
    status: string
    parent?: string
    labels?: string[]

    insertedAt: string
    insertedFrom: string
    updatedAt?: string
    updatedFrom?: string
}

export type RxLogDocument = RxDocument<RxLogDocumentType> & RxLogDocumentType
export const LogSchema = schema
