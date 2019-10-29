import { RxDocument } from 'rxdb'
import { DataItem } from '../../../_core/rxdb/models/entity'

export interface Agreement extends DataItem {
  data: {
    contact: string
    serial?: string
    createdAt: number
    updatedAt?: number
    status: AgreementStatus
    pdfTemplate?: string
    file?: string
    content?: string
  }
}

export enum AgreementStatus {
  draft = 'DRAFT',
  signed = 'SIGNED'
}

export type RxInvoiceDoc = RxDocument<Agreement> & Agreement
