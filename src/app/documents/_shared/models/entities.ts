import { RxDocument } from 'rxdb'
import DocumentSchema from './schemas/document.json'
import LineSchema from './schemas/line.json'

export const entities = [{
  name: 'documents',
  schema: DocumentSchema,
  sync: true
}, {
  name: 'lines',
  schema: LineSchema,
  sync: true
}]

export interface Document {
  name: string
  created: number
}

export interface Line {
  document: string
  text: string
  index: number
  edited: number
}

export type RxDocumentDoc = RxDocument<Document> & Document
export type RxLineDoc = RxDocument<Line> & Line
