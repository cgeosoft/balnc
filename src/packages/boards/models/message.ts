import * as schema from './message.json'
import { RxDocument } from 'rxdb'

declare interface IMessage {
  ref?: string
  text?: string
  data?: any
  sender?: string
  board?: string
  sendAt?: number
  status?: string
  type?: string
}

export type Message = IMessage
export type RxMessageDoc = RxDocument<IMessage> & IMessage
export const MessageSchema = schema
