export interface TableSchema {
  properties: {
    label?: string
    val? (item: any): any
    click? (item: any): any
    style?: any
    type?: any
    template?: any
    icon?: any
    empty?: any
    badgeItems?: any[]
    locked?: boolean
  }[]
}
