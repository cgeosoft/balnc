import { Message } from './message'
import * as schema from './board.json'
import { RxDocument } from 'rxdb'
import { BehaviorSubject } from 'rxjs'

declare interface IBoard {
  ref?: string
  name?: string
  members?: any[]
  created?: number
  avatar?: string
}

export type Board = IBoard
export type RxBoardDoc = RxDocument<IBoard> & IBoard
export const BoardSchema = schema
export type BoardWithMessages = { messages$?: BehaviorSubject<Message[]> } & RxBoardDoc
