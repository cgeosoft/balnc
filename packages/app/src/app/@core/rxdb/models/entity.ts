export interface Entity {
  _id: string
  _date: number
  _type: string
  _group: string
  _mark: boolean
  _tags: string[]
}

export interface DbEntity {
  _id?: string
  d: number
  t: string
  g: string
  m: boolean
  s: string[]
  c: any
}

export interface BulkObj {
  date?: number
  group?: string
  mark?: boolean
  tags?: string[]
  content: any
}
