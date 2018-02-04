import { RxDocumentBase } from "rxdb";

declare interface RxProjectDocumentType {
    name: string
    description: string
}

export type RxProjectDocument = RxProjectDocumentType
// export type Project = RxDocumentBase<RxProjectDocument> & RxProjectDocument
export const ProjectSchema = require('../../../../../schemas/teams/projects/project.json')
