import * as schema from './message.json'
import { RxDocument } from 'rxdb';

declare interface RxChatMessageDocumentType {
    text: string
    room: string
    sender: string
    sendAt: string
}

export type RxChatMessageDocument = RxDocument<RxChatMessageDocumentType> & RxChatMessageDocumentType
export const ChatMessageSchema = schema
