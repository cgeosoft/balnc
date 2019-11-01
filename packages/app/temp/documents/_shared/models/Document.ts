import { Entity } from '@balnc/core';
export interface Document extends Entity {
  data: {
    name: string;
  }
}
