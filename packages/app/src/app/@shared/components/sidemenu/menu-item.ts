export interface MenuItem {
  type: 'divider' | 'button'
  label?: string
  icon?: string | string[]
  url?: string | string[]
  expanded?: boolean
  action?: Function
  items?: MenuItem[]
}
