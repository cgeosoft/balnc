import { Message } from '@balnc/commons/boards/models/message'
import { RxDocument } from 'rxdb'

export type RxMessageDoc = RxDocument<Message> & Message
