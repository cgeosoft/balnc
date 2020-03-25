export interface Module {
  key: string
  type: 'CORE' | 'INTERGRATION'
  title: string
  description?: string
  icon?: string[] | string
  color?: string
  config?: any
  disabled?: boolean
}
