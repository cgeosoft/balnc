export interface BModule {
  id: string
  title: string
  description: string
  icon: string
  picon: string[]
  menu: Menu[]
  config?: any
}

export interface Menu {
  lable: string
  icon: any
  color: string
  path: string
}
