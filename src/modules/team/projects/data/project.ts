import * as schema from './project.json'
import { RxDocument } from 'rxdb';

declare interface RxProjectDocumentType {
    name: string
    description: string
    features: { [key: string]: boolean }
    tags: any[]
    isStarred: boolean
    isArchived: boolean
}

export type RxProjectDocument = RxDocument<RxProjectDocumentType> & RxProjectDocumentType
export const ProjectSchema = schema
