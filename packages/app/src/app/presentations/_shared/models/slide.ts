import { Entity } from '@balnc/core';

export interface Slide extends Entity {
  title: string
  description: string
  presentation: string
  content: SlideContent[]
}

export interface SlideContent {
  type: SlideContentType
  file: string
}

export enum SlideContentType {
  BACKGROUND
}
