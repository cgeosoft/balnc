import { RxDocument, RxCollection, RxDatabase } from 'rxdb'

declare interface RxPresentationDocumentType {
    orders: Array<string>
    dateCreated: string
    dateUpdated: string
    dateIssued?: string
    status: ("pending" | "issued")
    file?: string
    comment?: string
}

export type RxPresentationDocument = RxPresentationDocumentType

declare class RxPresentationCollection extends RxCollection<RxPresentationDocumentType> {
}

export class PresentationsDatabase extends RxDatabase {
    presentation?: RxPresentationCollection
}
