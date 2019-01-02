import { RxDocument } from 'rxdb'

declare interface IPresentation {
  title: string
  description: string
  image: string
  pages: any[]
  menu: any[]
  dateCreated: Date
  dateUpdated: Date
  dateIssued: any
  status: any
  comment: any
}

export type Presentation = RxDocument<IPresentation> & IPresentation
