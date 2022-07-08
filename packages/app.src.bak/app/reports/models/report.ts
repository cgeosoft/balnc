import { Entity } from '@balnc/core';
export interface Report extends Entity {
  alias?: string
  name?: string
  description?: string
  roles?: string[]
  fields?: any
  filters?: ReportFilter[]
  pdf?: any
}

export interface ReportFilter {
  name: string
  field: string
  filterType: string
  default?: any
  value?: any
  query?: string
  items?: any[]
}
