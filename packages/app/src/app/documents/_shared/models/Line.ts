import { Entity } from '../../../_core/rxdb/models/entity';
export interface Line extends Entity {
  data: {
    document: string;
    text: string;
    index: number;
  }
}
