import BoardSchema from './board.json'
import MessageSchema from './message.json'

export const BoardsEntities = [{
  name: 'boards',
  schema: BoardSchema,
  sync: true
}, {
  name: 'messages',
  schema: MessageSchema,
  sync: true
}]
