import { DataItem } from '../../../_core/rxdb/models/entity';

export interface Message extends DataItem {
  data: {
    text?: string
    sender: string
    board: string
    status: string
    type: string
  }
}
