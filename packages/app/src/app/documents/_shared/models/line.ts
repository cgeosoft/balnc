import { Entity } from '@balnc/core';
export interface Line extends Entity {
  document: string
  text: string
  index: number
}
