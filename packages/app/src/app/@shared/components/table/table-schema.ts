export interface TableSchema {
  name: string
  sort?: {
    label: string,
    direction: 'ASC' | 'DESC'
  }
  properties: {
    label?: string
    val? (item: any): any
    click? (item: any): any
    style?: any
    type?: any
    template?: any
    icon?: any
    empty?: any
    badges?: any
    locked?: boolean
    hidden?: boolean
  }[]
}
