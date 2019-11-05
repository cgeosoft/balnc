import { Entity } from '@balnc/core'

export interface ContactConn {
  reference: string
  type: string
}

export enum ContactType {
  person = 'person',
  company = 'company'
}

export interface Contact extends Entity {
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

export interface CEvent extends Entity {
  contact: string
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
  InvoiceRemoved,
  AgreementCreated,
  RecordCreated
}

export const CEventTypeBadges = {
  ContactAccessed: { label: 'Contact Accessed', color: '#78909C' },
  ContactCreated: { label: 'Contact Created', color: '#9FA8DA' },
  ContactUpdated: { label: 'Contact Updated', color: '#D4E157' },
  ConnectionCreated: { label: 'Connection Created', color: '#66BB6A' },
  ConnectionRemoved: { label: 'Connection Removed', color: '#ef5350' },
  OrderCreated: { label: 'Order Created', color: '#66BB6A' },
  OrderRemoved: { label: 'Order Removed', color: '#ef5350' },
  InvoiceCreated: { label: 'Invoice Created', color: '#66BB6A' },
  InvoiceRemoved: { label: 'Invoice Removed', color: '#ef5350' },
  AgreementCreated: { label: 'Agreement Created', color: '#66BB6A' }
}
