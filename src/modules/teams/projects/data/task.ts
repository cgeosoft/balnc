import * as schema from './task.json'
import { RxDocument } from 'rxdb';

declare interface RxTaskDocumentType {
    title: string
    description?: string
    project: string
    insertedAt: string
    updatedAt?: string
    insertedFrom: string
    status: string
    parent?: string
    labels?: string[]
}

export type RxTaskDocument = RxDocument<RxTaskDocumentType> & RxTaskDocumentType
export const TaskSchema = schema
