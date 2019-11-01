import { Entity } from '@balnc/core';
export interface Line extends Entity {
  data: {
    document: string;
    text: string;
    index: number;
  }
}
