import { RxDocument } from 'rxdb'

declare interface IReport {
  alias?: string
  name?: string
  description?: string
  roles?: string[]
  fields?: any
  filters?: ReportFilter[]
  pdf?: any
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

export type Report = IReport
export type RxReportDoc = RxDocument<IReport> & IReport
export type ReportFilter = IReportFilter
