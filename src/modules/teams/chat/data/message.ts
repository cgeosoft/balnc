import * as _chatMessageSchema from '@blnc/schemas/teams/chat/message.json'

declare interface RxChatMessageDocumentType {
    text: string
    room: string
    sender: string
    sendAt: string
}

export type RxChatMessageDocument = RxChatMessageDocumentType


export const ChatMessageSchema = _chatMessageSchema
