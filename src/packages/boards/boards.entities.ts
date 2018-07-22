import { Entity } from "@balnc/common";

import { BoardSchema } from "./models/board"
import { MessageSchema } from "./models/message"

export const BoardEntities: Entity[] = [{
  name: 'board',
  schema: BoardSchema,
  sync: true,
},{
  name: 'message',
  schema: MessageSchema,
  sync: true,
}]