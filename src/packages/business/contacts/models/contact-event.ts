import { RxDocument } from 'rxdb'

export interface ContactEvent {
  company?: string
  person?: string
  dateTime: string
  type: string
  description?: string
}
export type RxContactEventDocument = RxDocument<ContactEvent> & ContactEvent
