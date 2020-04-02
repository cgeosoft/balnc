export interface MenuItem {
  type: 'divider' | 'button'
  label?: string
  icon?: string | string[]
  route?: string | string[]
  expanded?: boolean
  action?: Function
  items?: MenuItem[]
}
