import { RxDocument } from 'rxdb'

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

export interface ContactLog {
  date: Date
  type: ContactLogType
  reference?: string
  comment?: string
}

export enum ContactLogType {
  Access,
  Create,
  Update,
  AddConnection,
  RemoveConnection
}

export interface Contact {
  name: string
  tags: string[]
  details?: ContactDetails
  conns?: ContactConn[]
  logs: ContactLog[]
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

export type RxContactDocument = RxDocument<Contact> & Contact
