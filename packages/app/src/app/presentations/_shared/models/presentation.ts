import { Entity } from '@balnc/core';

export interface Presentation extends Entity {
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

