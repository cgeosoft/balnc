import { Entity } from '@balnc/core';

export interface Message extends Entity {
  text?: string
  sender: string
  board: string
  status: string
  type: string
}
