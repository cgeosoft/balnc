import * as _projectSchema from '../../../../../schemas/teams/projects/project.json'

declare interface RxProjectDocumentType {
    name: string
    description: string
    features: { [key: string]: boolean }
    tags: any[]
    isStarred: boolean
    isArchived: boolean
}

export type RxProjectDocument = RxProjectDocumentType
export const ProjectSchema = _projectSchema
