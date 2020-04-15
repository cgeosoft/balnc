import { Entity } from '@balnc/core';

export interface Message extends Entity {
  text?: string
  sender: string
  status: string
  type: string
  file?: string
  quote?: Message
  image?: {
    alt?: string
    url?: string
    width?: string
    height?: string
  }
  metadata?: OgMetadata
}

export interface OgMetadata {
  ogLocale?: string
  ogType?: string
  ogTitle?: string
  ogDescription?: string
  ogUrl?: string
  ogSiteName?: string
  twitterCard?: string
  twitterDescription?: string
  twitterTitle?: string
  twitterSite?: string
  ogImage?: {
    url?: string
    width?: number
    height?: number
    type?: any
  },
  ogVideo?: {
    url?: string
    width?: number
    height?: number
    type?: any
  },
  twitterImage?: {
    url?: string
    width?: null,
    height?: null,
    alt?: null
  }
}
