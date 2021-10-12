export interface Entity {
  id?: string
  date?: number
  type?: string
  group?: string
  mark?: boolean
  tags?: string[]
  content?: any
}

export interface BulkObj {
  date?: number
  group?: string
  mark?: boolean
  tags?: string[]
  content: any
}
