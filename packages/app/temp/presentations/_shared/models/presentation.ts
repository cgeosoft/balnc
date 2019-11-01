import { RxDocument } from 'rxdb'

export interface Presentation {
  title: string
  description?: string
  image?: string
  pages: any[]
  menu?: any[]
  dateCreated: number
  dateUpdated?: number
  comment?: any
}

export interface PresentationStats {
  filecount: number
  filesize: number
}

export interface Page {
  title: string,
  description: string,
  file: any,
  fileType: string
}

export type RxPresentationDoc = RxDocument<Presentation> & Presentation
