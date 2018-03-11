import * as schema from './presentation.json'

declare interface RxPresentationDocumentType {
    title: string
    description: string
    image: string
    pages: any[]
    menu: any[]
    dateCreated: string
    dateUpdated: string
    dateIssued: any
    status: any
    comment: any
}

export type RxPresentationDocument = RxPresentationDocumentType
export const PresentationSchema = schema
