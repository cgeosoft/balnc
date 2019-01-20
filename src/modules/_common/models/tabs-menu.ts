export type TabsMenu = {
  selected?: string
  tabs?: TabsMenuItem[]
}

export type TabsMenuItem = {
  id?: string
  label?: string
  icon?: string | string[]
  right?: boolean
}
