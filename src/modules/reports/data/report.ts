import * as schema from './report.json'
import { RxDocument } from 'rxdb';

declare interface RxReportDocumentType {
    alias?: string
    name?: string
    description?: string
    hierarchy?: number
    fields?: any
    filters?: ReportFilter[]
    pdf?: any
    query?: string
}

declare interface ReportFilterType {
    name: string
    field: string
    type: string
    default?: any
    value?: any
    data?: string
    values?: any[]
}

export type Report = RxReportDocumentType
export type RxReportDocument = RxDocument<RxReportDocumentType> & RxReportDocumentType
export type ReportFilter = ReportFilterType
export const ReportSchema = schema
