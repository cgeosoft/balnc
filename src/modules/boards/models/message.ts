import { RxDocument } from 'rxdb'

export interface Message {
  timestamp: number
  text?: string
  data?: any
  sender: string
  board: string
  status: string
  type: string
}

export type RxMessageDoc = RxDocument<Message> & Message
