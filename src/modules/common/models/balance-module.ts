declare interface BalanceModuleType {
  module: string
  title: string
  description: string
  menu?: BalanceModuleMenuType[]
  config?: any
}

declare interface BalanceModuleMenuType {
  id: string
  label: string
  icon: string
  path: string
}

export type BalanceModule = BalanceModuleType
export type BalanceModuleMenu = BalanceModuleMenuType
