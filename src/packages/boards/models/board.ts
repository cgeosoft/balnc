import { Message } from './message'
import * as schema from './board.json'
import { RxDocument } from 'rxdb'

declare interface IBoard {
  ref?: string
  name?: string
  members?: any[]
  created?: number
  lastMessage?: Message
  avatar?: string
}

export type Board = IBoard
export type RxBoardDoc = RxDocument<IBoard> & IBoard
export const BoardSchema = schema
