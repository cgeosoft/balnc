import { RxDocument } from 'rxdb'
import { Entity } from 'src/app/_core/rxdb/models/entity'

export interface Report extends Entity {
  data: {
    alias?: string
    name?: string
    description?: string
    roles?: string[]
    fields?: any
    filters?: ReportFilter[]
    pdf?: any
  }
}

declare interface IReportFilter {
  name: string
  field: string
  type: string
  default?: any
  value?: any
  query?: string
  items?: any[]
}

export type RxReportDoc = RxDocument<Report> & Report
export type ReportFilter = IReportFilter
