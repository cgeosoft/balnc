declare interface BalncModuleType {
  id: string
  title: string
  description: string
  menu?: BalncModuleMenuType[]
  config?: BalncModuleConfigType
}

declare interface BalncModuleMenuType {
  id: string
  label: string
  icon: any
  path: string
}

declare interface BalncModuleConfigType {
  enabled: string
  menu: any[]
  settings: any
}

export type BalncModule = BalncModuleType
export type BalncModuleMenu = BalncModuleMenuType
export type BalncModuleConfig = BalncModuleConfigType
