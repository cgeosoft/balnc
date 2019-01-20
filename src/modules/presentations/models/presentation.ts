import { RxDocument } from 'rxdb'

export interface Presentation {
  title: string
  description?: string
  image?: string
  pages: any[]
  menu?: any[]
  dateCreated: Date
  dateUpdated?: Date
  comment?: any
}

export interface PresentationStats {
  filecount: number
  filesize: number
}

export type PresentationDoc = RxDocument<Presentation> & Presentation
