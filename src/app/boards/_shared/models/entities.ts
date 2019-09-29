import BoardSchema from './schemas/board.json'
import MessageSchema from './schemas/message.json'

export const BoardsEntities = [{
  name: 'boards',
  schema: BoardSchema,
  sync: true,
  syncType: 'graphql',
  mutationQuery: `
    mutation CreateBoard($doc: inputBoard) {
      setBoard(doc: $doc) {
        _id,
        updatedAt
      }
    }`,
  feedQuery: (doc, batchSize) => {
    return `
      {
        feedBoards(lastId: "${doc._id}", minUpdatedAt: ${doc.updatedAt}, limit: ${batchSize}) {
          _id
          name
          created
          avatar
          updatedAt
          deleted
        }
      }`
  }
}, {
  name: 'messages',
  schema: MessageSchema,
  sync: true,
  syncType: 'graphql',
  mutationQuery: `
    mutation CreateMessage($doc: inputMessage) {
      setMessage(doc: $doc) {
        _id,
        updatedAt
      }
    }
  `,
  feedQuery: (doc, batchSize) => {
    return `
      {
        feedMessages(lastId: "${doc._id}", minUpdatedAt: ${doc.updatedAt}, limit: ${batchSize}) {
          _id
          timestamp
          text
          data
          sender
          board
          status
          type
          updatedAt
          deleted
        }
      }`
  }
}]
