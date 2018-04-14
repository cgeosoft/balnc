declare interface ReportType {
    alias?: string
    name?: string
    description?: string
    hierarchy?: number
    fields?: any
    filters?: ReportFilterType[]
    query?: string
}

declare interface ReportFilterType {
    name: string
    field: string
    type: string
    defaultValue?: string
    values?: any
}

export type Report = ReportType
export type ReportFilter = ReportFilterType
