import { DataItem } from '../../../_core/rxdb/models/entity';

export interface Board extends DataItem {
  data: {
    name: string;
    members?: {
      [k: string]: any;
    }[];
    created?: number;
    avatar?: string;
  }
}
