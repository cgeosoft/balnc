import * as schema from './account.json'

declare interface RxAccountDocumentType {
    name: string
    alias: string
    config: any
}

export type RxAccountDocument = RxAccountDocumentType
export const AccountSchema = schema
