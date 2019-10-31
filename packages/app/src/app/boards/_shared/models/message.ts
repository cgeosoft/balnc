import { Entity } from '../../../_core/rxdb/models/entity';

export interface Message extends Entity {
  data: {
    text?: string
    sender: string
    board: string
    status: string
    type: string
  }
}
