import * as _logSchema from '@blnc/schemas/teams/projects/log.json'

declare interface RxLogDocumentType {
    project: string
    task: string
    insertedAt: string
    insertedFrom: string
    type: string
    comment: string
}

export type RxLogDocument = RxLogDocumentType
export const LogSchema = _logSchema
