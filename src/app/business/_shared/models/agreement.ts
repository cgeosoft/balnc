import { RxDocument } from 'rxdb';

export interface Agreement {
  contact: string
  serial: string
  createdAt: number
  updatedAt?: number
  status: AgreementStatus
  pdfTemplate?: string
  file?: string
  content?: string
}

export enum AgreementStatus {
  draft = "DRAFT",
  signed = "SIGNED"
}

export type RxInvoiceDoc = RxDocument<Agreement> & Agreement
