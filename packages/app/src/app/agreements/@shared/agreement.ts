import { Entity } from '@balnc/core'

export interface Agreement extends Entity {
  contact: string
  serial?: string
  updatedAt?: number
  status: AgreementStatus
  pdfTemplate?: string
  file?: string
  content?: string
}

export enum AgreementStatus {
  draft = 'DRAFT',
  signed = 'SIGNED'
}
