declare interface RxTaskDocumentType {
    title?: string
    insertedAt?: string
    updatedAt?: string
    insertedFrom?: string
    log?: {
        comment: string
        from?: string
        at?: string
        type?: string
    }[]
    status?: string
    parent?: string
    labels?: string[]
    project?: string
}

export type RxTaskDocument = RxTaskDocumentType

export const TaskSchema = require('../../../../../schemas/teams/projects/task.json')
