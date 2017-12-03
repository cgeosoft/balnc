import { RxDocument, RxCollection, RxDatabase } from 'rxdb'

declare interface RxMessageDocumentType {
    text: string
}
declare interface RxRoomDocumentType {
    name: string
}

export type RxMessageDocument = RxMessageDocumentType
export type RxRoomDocument = RxRoomDocumentType

declare class RxMessagesCollection extends RxCollection<RxMessageDocumentType> {
}

declare class RxRoomsCollection extends RxCollection<RxRoomDocumentType> {
}

export class RxChatDatabase extends RxDatabase {
    messages?: RxMessagesCollection
    rooms?: RxRoomsCollection
}

// export default {
//     RxMessagesCollection,
//     RxRoomsCollection,
//     RxChatDatabase
// }