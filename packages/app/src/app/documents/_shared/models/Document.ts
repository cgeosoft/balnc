import { Entity } from '../../../_core/rxdb/models/entity';
export interface Document extends Entity {
  data: {
    name: string;
  }
}
