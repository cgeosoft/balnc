import { RxDocument, RxCollection, RxDatabase } from 'rxdb'

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

declare class RxPresentationCollection extends RxCollection<RxPresentationDocumentType> {
}

export class PresentationsDatabase extends RxDatabase {
    presentation?: RxPresentationCollection
}
