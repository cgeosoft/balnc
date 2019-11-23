import { Entity } from '@balnc/core';

export interface Board extends Entity {
  name: string
  members?: {
    [k: string]: any;
  }[]
  created?: number
  avatar?: string
  pinned?: boolean
  archived?: boolean
}
