export interface TabsMenu {
  selected?: string
  tabs?: TabsMenuItem[]
}

export interface TabsMenuItem {
  id?: string
  label?: string
  icon?: string | string[]
  right?: boolean
}
