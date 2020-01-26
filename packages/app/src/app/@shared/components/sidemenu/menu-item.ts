export interface MenuItem {
  type: string
  label: string
  icon?: string[]
  url?: string[]
  items?: MenuItem[]
}
