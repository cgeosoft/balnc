import BoardSchema from './schemas/board.json'
import MessageSchema from './schemas/message.json'

export const BoardsEntities = [{
  name: 'boards',
  schema: BoardSchema,
  sync: true
}, {
  name: 'messages',
  schema: MessageSchema,
  sync: true
}]
