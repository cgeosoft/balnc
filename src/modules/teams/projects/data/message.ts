declare interface RxTodoDocumentType {
    title: string
    insertedAt: string
    updatedAt: string
    insertedFrom: string
}

export type RxTodoDocument = RxTodoDocumentType

export const TodoSchema = require('../../../../../schemas/teams/projects/todo.json')
