import { RxDocument } from 'rxdb';

export interface ContactDetails {
  avatar?: string
  phones?: string[]
  emails?: string[]
  socials?: string[]
  offices?: Office[]
  taxDetails?: TaxDetails
}

export interface ContactConn {
  reference: string
  type: string
}

export enum ContactType {
  person,
  company
}

export interface Contact {
  name: string
  type: ContactType
  tags: string[]
  details: ContactDetails
  conns?: ContactConn[]
}

export interface Office {
  address: string
  location?: string
  phones?: string[]
  emails?: string[]
}

export interface TaxDetails {
  vatNumber: string
  taxOffice: string
  address: string
  legalName: string
  description: string
}

export interface CEvent {
  contact: string
  date: number
  type: CEventType
  reference?: string
  comment?: string
}

export enum CEventType {
  ContactAccessed,
  ContactCreated,
  ContactUpdated,
  ConnectionCreated,
  ConnectionRemoved,
  OrderCreated,
  OrderRemoved,
  InvoiceCreated,
  InvoiceRemoved
}

export type RxContactDoc = RxDocument<Contact> & Contact

export type RxCEventDoc = RxDocument<CEvent> & CEvent
