import { Entity } from '../../../_core/rxdb/models/entity';

export interface Board extends Entity {
  data: {
    name: string;
    members?: {
      [k: string]: any;
    }[];
    created?: number;
    avatar?: string;
  }
}
