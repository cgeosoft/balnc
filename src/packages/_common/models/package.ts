export interface Package {
  id: string
  title: string
  description: string
  menu: Menu[]
  config?: any
}

export interface Menu {
  lable: string
  icon: any
  path: string
}
