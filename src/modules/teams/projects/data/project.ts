import * as _projectSchema from '../../../../../schemas/teams/projects/project.json'

declare interface RxProjectDocumentType {
    name: string
    description: string
}

export type RxProjectDocument = RxProjectDocumentType
export const ProjectSchema = _projectSchema
