import * as schema from './presentation.json'
import { RxDocument } from 'rxdb'

declare interface IPresentation {
  title: string
  description: string
  image: string
  pages: any[]
  menu: any[]
  dateCreated: string
  dateUpdated: string
  dateIssued: any
  status: any
  comment: any
}

export type Presentation = RxDocument<IPresentation> & IPresentation
export const PresentationSchema = schema
