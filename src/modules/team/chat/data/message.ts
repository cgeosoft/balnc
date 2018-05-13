import * as schema from './message.json'
import { RxDocument } from 'rxdb';

declare interface IChatMessage {
    text?: string
    sender?: string
    channel?: string
    sendAt?: number
    status?: number
}

export type ChatMessage = IChatMessage
export type RxChatMessageDoc = RxDocument<IChatMessage> & IChatMessage
export const ChatMessageSchema = schema
