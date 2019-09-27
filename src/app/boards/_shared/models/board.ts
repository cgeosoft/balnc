import { RxDocument } from 'rxdb'

export interface Board {
  key?: string
  name?: string
  members?: any[]
  created?: number
  avatar?: string
}

export type RxBoardDoc = RxDocument<Board> & Board
