import * as schema from './report.json'
import { RxDocument } from 'rxdb';

declare interface RxReportDocumentType {
    alias?: string
    name?: string
    description?: string
    hierarchy?: number
    fields?: any
    filters?: any
    query?: string
}

declare interface ReportFilterType {
    name: string
    field: string
    type: string
    defaultValue?: string
    common?: string
    values?: any[]
}

export type RxReportDocument = RxDocument<RxReportDocumentType> & RxReportDocumentType
export const ReportSchema = schema
