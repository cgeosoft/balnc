import { RxDocument } from 'rxdb'

import * as _ContactEventSchema from './contact-event.json'

export interface ContactEvent {
  company?: string
  person?: string
  dateTime: string
  type: string
  description?: string
}
export type RxContactEventDocument = RxDocument<ContactEvent> & ContactEvent
export const ContactEventSchema = _ContactEventSchema
