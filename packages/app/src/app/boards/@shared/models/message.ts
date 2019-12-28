import { Entity } from '@balnc/core';

export interface Message extends Entity {
  text?: string
  sender: string
  board: string
  status: string
  type: string
  file: string
  metadata: OgMetadata
}

export interface OgMetadata {
  ogLocale: string
  ogType: string
  ogTitle: string
  ogDescription: string
  ogUrl: string
  ogSiteName: string
  twitterCard: string
  twitterDescription: string
  twitterTitle: string
  twitterSite: string
  ogImage: {
    url: string
    width: number
    height: number
    type: any
  },
  twitterImage: {
    url: string
    width: null,
    height: null,
    alt: null
  }
}

