declare interface BalanceModuleType {
  id: string
  namespace: string
  title: string
  description: string
  menu?: BalanceModuleMenuType
  config?: any
}

declare interface BalanceModuleMenuType {
  label: string
  icon: string
  path: string
}

export type BalanceModule = BalanceModuleType
export type BalanceModuleMenu = BalanceModuleMenuType
