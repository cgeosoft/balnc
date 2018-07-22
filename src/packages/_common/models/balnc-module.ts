declare interface IBalncModule {
  id: string
  title: string
  description: string
  menu?: BalncModuleMenu[]
  config?: BalncModuleConfig
}

declare interface IBalncModuleMenu {
  id: string
  label: string
  icon: any
  path: string
}

declare interface IBalncModuleConfig {
  enabled: string
  menu: any[]
  settings: any
}

export type BalncModule = IBalncModule
export type BalncModuleMenu = IBalncModuleMenu
export type BalncModuleConfig = IBalncModuleConfig
