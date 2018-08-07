import { BoardSchema } from './models/board'
import { MessageSchema } from './models/message'

export const BoardsEntities = [{
  name: 'boards',
  schema: BoardSchema,
  sync: true
}, {
  name: 'messages',
  schema: MessageSchema,
  sync: true
}]
