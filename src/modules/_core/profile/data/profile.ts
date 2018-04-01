import * as schema from './profile.json'

declare interface RxProfileDocumentType {
    name: string
    alias: string
}

export type RxProfileDocument = RxProfileDocumentType
export const ProfileSchema = schema
