import { Entity } from '@balnc/core'

export interface Presentation extends Entity {
  title: string
  description?: string
  image?: string
  menu?: any[]
  dateCreated: number
  dateUpdated?: number
  comment?: any
  pinned?: boolean
}

export interface PresentationStats {
  filecount?: number
  filesize?: number
}
