import * as _taskSchema from '@blnc/schemas/teams/projects/task.json'

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

export type RxTaskDocument = RxTaskDocumentType
export const TaskSchema = _taskSchema
