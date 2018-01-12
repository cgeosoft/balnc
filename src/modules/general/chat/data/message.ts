declare interface RxChatMessageDocumentType {
    text: string
    room: string
    sender: string
    sendAt: string
}

export type RxChatMessageDocument = RxChatMessageDocumentType


export const ChatMessageSchema = require('../../../../../schemas/general/chat/message.json')
