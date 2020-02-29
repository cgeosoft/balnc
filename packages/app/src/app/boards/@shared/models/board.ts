import { Entity } from '@balnc/core';

export interface Board extends Entity {
  name: string
  description: string
  members?: {
    [k: string]: any;
  }[]
  avatar?: string
  archived?: boolean
}
