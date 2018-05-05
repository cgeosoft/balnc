declare interface BalncModuleType {
  module: string
  title: string
  description: string
  menu?: BalncModuleMenuType[]
  config?: any
}

declare interface BalncModuleMenuType {
  id: string
  label: string
  icon: string
  path: string
}

export type BalncModule = BalncModuleType
export type BalncModuleMenu = BalncModuleMenuType
