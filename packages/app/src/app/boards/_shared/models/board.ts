import { Board } from '@balnc/commons/boards/models/board'
import { RxDocument } from 'rxdb'

export type RxBoardDoc = RxDocument<Board> & Board
