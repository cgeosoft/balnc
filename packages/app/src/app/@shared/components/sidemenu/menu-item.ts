export interface MenuItem {
  type: 'divider' | 'button'
  highlight?: boolean
  label?: string
  icon?: string | string[]
  route?: string | string[]
  expanded?: boolean
  items?: MenuItem[]
  action?: () => void
}
