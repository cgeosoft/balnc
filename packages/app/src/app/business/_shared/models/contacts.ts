import { RxDocument } from 'rxdb'
import { DataItem } from '../../../_core/rxdb/models/entity'

export interface ContactConn {
  reference: string
  type: string
}

export enum ContactType {
  person = 'person',
  company = 'company'
}

export interface Contact extends DataItem {
  data: {
    name: string
    type: ContactType
    tags: string[]
    details: {
      avatar?: string
      phones?: string[]
      emails?: string[]
      socials?: string[]
      offices?: {
        address: string
        location?: string
        phones?: string[]
        emails?: string[]
      }[]
      taxDetails?: {
        vatNumber: string
        taxOffice: string
        address: string
        legalName: string
        description: string
      }
    }
    conns?: ContactConn[]
  }
}

export interface CEvent extends DataItem {
  data: {
    contact: string
    type: CEventType
    reference?: string
    comment?: string
  }
}

export enum CEventType {
  ContactAccessed = 'ContactAccessed',
  ContactCreated = 'ContactCreated',
  ContactUpdated = 'ContactUpdated',
  ConnectionCreated = 'ConnectionCreated',
  ConnectionRemoved = 'ConnectionRemoved',
  OrderCreated = 'OrderCreated',
  OrderRemoved = 'OrderRemoved',
  InvoiceCreated = 'InvoiceCreated',
  InvoiceRemoved = 'InvoiceRemoved',
  AgreementCreated = 'AgreementCreated'
}

export type RxContactDoc = RxDocument<Contact> & Contact

export type RxCEventDoc = RxDocument<CEvent> & CEvent
