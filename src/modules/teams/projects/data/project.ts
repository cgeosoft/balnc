declare interface RxProjectDocumentType {
    name: string
    description: string
}

export type RxProjectDocument = RxProjectDocumentType

export const ProjectSchema = require('../../../../../schemas/teams/projects/project.json')
